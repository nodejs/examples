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

# Calling other actions

Using serverless platforms to implement reusable functions means you will often want to invoke one action from another. IBM Cloud Functions (ICF) provides a [RESTful API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/openwhisk/openwhisk/master/core/controller/src/main/resources/apiv1swagger.json) to invoke actions programmatically.

Rather than having to [manually construct the HTTP requests](https://github.com/apache/incubator-openwhisk/blob/master/docs/rest_api.md#actions) to invoke actions from within the ICF runtime, client libraries are pre-installed to make this easier.

These libraries make it simple to invoke other actions, fire triggers, and access all other platform services.

## Example proxy

Let's look at an example of creating a proxy action which invokes another action (like your `hello` action) if a password is present in the input parameters.

1. Create the new action named `proxy` from the following source files:

    ```javascript
    var openwhisk = require('openwhisk');

    function main(params) {
        if (params.password !== 'secret') {
        throw new Error("Password incorrect!")
        }

        var ow = openwhisk();
        return ow.actions.invoke({name: "hello", blocking: true, result: true, params: params})
    }
    ```

    ```bash
    ibmcloud fn action create proxy proxy.js
    ```

{% hint style="info" %}
The function uses the [NPM Apache OpenWhisk](https://www.npmjs.com/package/openwhisk) JavaScript library which is pre-installed in the ICF runtime (so you do not need to package it). Its source code can be found here: [https://github.com/apache/openwhisk-client-js/](https://github.com/apache/openwhisk-client-js/).
{% endhint %}

2. Invoke the proxy with an incorrect password:

    ```bash
    ibmcloud fn action invoke proxy -p password wrong -r
    ```

    ```json
    {
        "error": "An error has occurred: Error: Password incorrect!"
    }
    ```

{% hint style="tip" %}
On the invoke call above, you used the short form for the `--result` flag which is `-r`.
{% endhint %}

3. Invoke the proxy with the correct password:

    ```bash
    ibmcloud fn action invoke proxy -p password secret -p name Bernie -p place Vermont -r
    ```

    ```json
    {
        "greeting": "Hello Bernie from Vermont"
    }
    ```

4. Review the activations list to show both actions were invoked:

   ```bash
   ibmcloud fn activation list -l 2
   ```

    ```text
    Activation ID                    Kind      Start Duration   Status  Entity
    8387302c81dc4d2d87302c81dc4d2dc6 nodejs:10 cold  35ms       success hello:0.0.4
    e0c603c242c646978603c242c6c6977f nodejs:10 cold  438ms      success proxy:0.0.1
    ```

{% hint style="tip" %}
On the invoke call above, you used the short form for the `--last` flag which is `-l` with a parameter to only `list` the last `2` activations.
{% endhint %}

{% hint style="success" %}
Congratulations on proxying an action! Be sure to [check out all the cool things](https://github.com/apache/openwhisk-client-js/#examples) the NPM OpenWhisk JavaScript library can be used for. Everything from invoking triggers to firing events to chaining action calls within actions can be performed!
{% endhint %}
