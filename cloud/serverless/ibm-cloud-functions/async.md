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

# Asynchronous actions

## Return asynchronous results

JavaScript functions that run asynchronously may need to return the activation result after the `main` function has returned. You can accomplish this by returning a Node.js `Promise` in your action.

1. Save the following content in a file called `asyncAction.js`:

```javascript
function main(args) {
     return new Promise(function(resolve, reject) {
       setTimeout(function() {
         resolve({ done: true });
       }, 2000);
    })
 }
```

Notice that the `main` function returns a promise, which indicates that the activation hasn't completed yet, but is expected to in the future.

The `setTimeout()` JavaScript function, in this case, waits for two seconds before calling the callback function. This represents the asynchronous code and goes inside the promise's callback function.

The promise's callback takes two arguments, resolve and reject, which are both functions. The call to `resolve()`fulfills the promise and indicates that the activation has completed normally.

A call to `reject()` can be used to reject the promise and signal that the activation has completed abnormally.

## Test asynchronous timeouts

1. Run the following commands to create the action and invoke it:

   ```bash
   ibmcloud fn action create asyncAction asyncAction.js
   ```

   ```bash
   ibmcloud fn action invoke --result asyncAction
   ```

   ```json
   {
       "done": true
   }
   ```

   Notice that you performed a blocking invocation of an asynchronous action.

2. Fetch the last activation log to see how long the async activation took to complete:

   ```text
   ibmcloud fn activation get --last
   ```

   ```json
   {
      ...
      "start": 1574133220119,
      "end": 1574133222155,
      "duration": 2036,
      ...
   }
   ```

   Checking the `duration` field in the activation record, you can see that this activation took slightly over two seconds to complete.

{% hint style="info" %}
Actions have a `timeout` parameter that enforces the maximum duration for an invocation. This value defaults to 60 seconds and can be changed to a maximum of 5 minutes.
{% endhint %}

Let's look at what happens when an action invocation takes longer than the `timeout`.

1. Update the `asyncAction` timeout to 1000ms:

   ```bash
   ibmcloud fn action update asyncAction --timeout 1000
   ```

   ```text
   ok: updated action asyncAction
   ```

2. Invoke the action and block on the result:

   ```bash
   ibmcloud fn action invoke asyncAction --result
   ```

   ```json
   {
       "error": "The action exceeded its time limits of 1000 milliseconds."
   }
   ```

   The error message returned by the platform indicates the action didn't return a response within the user-specified timeout. If we change the `timeout` back to a value higher than the artificial delay in the function, it should work again.

3. Update the `asyncAction` timeout to `10000 ms`:

   ```bash
   ibmcloud fn action update asyncAction --timeout 10000
   ```

   ```text
   ok: updated action asyncAction
   ```

4. Invoke the action and block on the result:

   ```bash
   ibmcloud fn action invoke asyncAction --result
   ```

   ```json
   {
       "done": true
   }
   ```

<!-- {% hint style="info" %}
Bonus exercise: Try out this exercise [Calling an external API from an Async action](../bonus-exercises/ex1-invoking-an-async-api.md) to test your knowledge!
{% endhint %} -->

{% hint style="tip" %}
Asynchronous actions are necessary for calling other APIs or cloud services. Don't forget about that timeout though!
{% endhint %}

{% hint style="success" %}
The power of asynchronous actions is now yours! There is no need to wait for those longer-running functions, as ICF does that for you! Next, let's look at how we might compose simple chains of actions using sequences.
{% endhint %}
