<!--
#
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
-->

# Retrieve action logs

Application logs are essential to debugging production issues. In IBM Cloud Functions (ICF), all output written to `stdout` and `stderr` by actions is available in the activation records.

## Create activation logs

1. Create a new action named `logs` from the following source files:

    ```javascript
    function main(params) {
        console.log("function called with params", params)
        console.error("this is an error message")
        return { result: true }
    }
    ```

    ```bash
    ibmcloud fn action create logs logs.js
    ```

    ```bash
    ok: created action logs
    ```

2. Invoke the `logs` action to generate logs:

    ```bash
    ibmcloud fn action invoke -r logs -p hello world
    ```

    ```json
    {
        "result": true
    }
    ```

## Access activation logs

Retrieve the activation record to verify logs have been recorded:

```text
ibmcloud fn activation get --last
```

```json
ok: got activation 9fc044881705479580448817053795bd
{
    ...
    "logs": [
        "20xx-11-14T09:49:03.021Z stdout: function called with params { hello: 'world' }",
        "20xx-11-14T09:49:03.021Z stderr: this is an error message"
    ],
    ...
}
```

Logs can also be retrieved without showing the whole activation record, using the `activation logs` command:

```bash
ibmcloud fn activation logs --last
```

```text
20xx-11-14T09:49:03.021404683Z stdout: function called with params { hello: 'world' }
20xx-11-14T09:49:03.021816473Z stderr: this is an error message
```

## Poll activation logs

Activation logs can be monitored in real time, rather than manually retrieving individual activation records.

1. In another terminal, run the following command to monitor logs from the `logs` actions:

   ```bash
   ibmcloud fn activation poll
   ```

   ```text
   Enter Ctrl-c to exit.
   Polling for activation logs
   ```

2. In your original terminal, run the following command multiple times:

   ```bash
   ibmcloud fn action invoke logs -p hello world
   ```

   ```text
   ok: invoked /_/logs with id 0e8d715393504f628d715393503f6227
   ```

3. Check the output from the `poll` command to see the activation logs:

   ```bash
   Activation: 'logs' (ae57d06630554ccb97d06630555ccb8b)
   [
       "20xx-11-14T09:56:17.8322445Z stdout: function called with params { hello: 'world' }",
       "20xx-11-14T09:56:17.8324766Z stderr: this is an error message"
   ]

   Activation: 'logs' (0e8d715393504f628d715393503f6227)
   [
       "20xx-11-14T09:56:20.8992704Z stdout: function called with params { hello: 'world' }",
       "20xx-11-14T09:56:20.8993178Z stderr: this is an error message"
   ]

   Activation: 'logs' (becbb9b0c37f45f98bb9b0c37fc5f9fc)
   [
       "20xx-11-14T09:56:44.6961581Z stderr: this is an error message",
       "20xx-11-14T09:56:44.6964147Z stdout: function called with params { hello: 'world' }"
   ]
   ```

{% hint style="success" %}
As you can see, activation logs provide critical insight into your functions when running within the ICF service. Next, let's explore how we can call other actions from an action allowing for function reuse.
{% endhint %}
