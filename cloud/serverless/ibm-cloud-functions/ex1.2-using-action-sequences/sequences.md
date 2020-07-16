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

# Create and invoke sequences

IBM Cloud Functions (ICF) supports a kind of action called a sequence. Sequence actions are created using a list of existing actions. When the sequence action is invoked, each action is executed in order of the action parameter list. Input parameters are passed to the first action in the sequence. Output from each function in the sequence is passed as the input to the next function and so on. The output from the last action in the sequence is returned as the response result.

{% hint style="info" %}
Sequences behave like normal actions. You create, invoke, and manage them as actions through the CLI.
{% endhint %}

Here's an example of defining an action `my_sequence` from a sequence of three actions \(`a`, `b`, and `c`\):

```bash
ibmcloud fn action create my_sequence --sequence a,b,c
```

{% hint style="warning" %}
**Be advised**: The instruction above is merely an example of the syntax used to create an action sequence and should not be run.
{% endhint %}

If you want several actions to work in sequence, you do not have to code the logic yourself (although you could). Instead, ICF provides a built-in concept called a sequence that manages the logic for you. This also provides the benefit of keeping your actions agnostic of other actions, preserving your ability to reuse them for many serverless apps. In the example above, a sequence would be created for each serverless function in the application. This includes combing the action doing the authentication followed by the actual request processing action.

Let's look at an example of using sequences.

1. Create the file \(`funcs.js`\) and add the following functions:

    ```javascript
    function split(params) {
      var text = params.text || ""
      var words = text.split(' ')
      return { words: words }
    }

    function reverse(params) {
      var words = params.words || []
      var reversed = words.map(word => word.split("").reverse().join(""))
      return { words: reversed }
    }

    function join(params) {
      var words = params.words || []
      var text = words.join(' ')
      return { text: text }
    }
    ```

2. Now create the following three actions:

    ```bash
    ibmcloud fn action create split funcs.js --main split
    ```

    ```bash
    ibmcloud fn action create reverse funcs.js --main reverse
    ```

    ```bash
    ibmcloud fn action create join funcs.js --main join
    ```

{% hint style="info" %}
Notice how our JavaScript source code had no `main` function. Instead, when we created each action, we supplied the name of the function to be used as its `main` function using the flag `--main`.
{% endhint %}

## Create sequence actions

1. Test each action to verify it is working.

    The function `split` takes the single string `hello world` and splits it into a JSON map of the individual `strings` using the space character as the delimiter.

    ```bash
    ibmcloud fn action invoke split --result --param text "Hello world"
    ```

    ```json
    {
        "words": [
            "Hello",
            "world"
        ]
    }
    ```

    The function `reverse` takes a JSON array of `strings` and reverses the characters in each.

    ```bash
    ibmcloud fn action invoke reverse --result --param words '["hello", "world"]'
    ```

    ```json
    {
        "words": [
            "olleh",
            "dlrow"
        ]
    }
    ```

    The function `join` takes the JSON array of `strings` and concatenates them back into a space-delimited string.

    ```bash
    ibmcloud fn action invoke join --result --param words '["hello", "world"]'
    ```

    ```json
    {
        "text": "hello world"
    }
    ```

    Now, let's see them all work together as an action sequence.

2. Create the following action sequence:

    ```bash
    ibmcloud fn action create reverse_words --sequence split,reverse,join
    ```

3. Test out the action sequence:

    ```bash
    ibmcloud fn action invoke reverse_words --result --param text "hello world"
    ```

    ```json
    {
        "text": "olleh dlrow"
    }
    ```

{% hint style="success" %}
As you can see, using sequences is a great way to develop re-usable action components that can be joined together into higher-order actions to create serverless applications.
{% endhint %}

{% hint style="info" %}
Using ICF, you can create sequences from actions written in different programming languages! For example, you can create a sequence from actions written in JavaScript with Python or Java!
{% endhint %}

## Handle errors

What if you want to stop processing functions in a sequence? This might be due to an application error or because the pre-conditions to continue processing have not been met. In the authentication example above, you only want to proceed if the authentication check passes.

If any action within the sequences returns an error, the platform returns immediately. The action error is returned as the response and no further actions within the sequence will be invoked.

Let's look at how this works.

1. Add the following functions to the file `funcs.js`:

  ```javascript
  function fail (params) {
    if (params.fail) {
        throw new Error("stopping sequence and returning.")
    }

    return params
  }

  function end (params) {
    return { message: "sequence finished." }
  }
  ```

2. Create the following three actions:

  ```bash
  ibmcloud fn action create fail funcs.js --main fail
  ```

  ```bash
  ibmcloud fn action create end funcs.js --main end
  ```

  ```bash
  ibmcloud fn action create example --sequence fail,end
  ```

3. Test out the action sequence without the `fail` parameter:

  ```bash
  ibmcloud fn action invoke example -r
  ```

  ```json
  {
      "message": "sequence finished."
  }
  ```

4. Test out the action sequence with the `fail` parameter set to `true`:

   ```text
   ibmcloud fn action invoke example -r -p fail true
   ```

   ```json
   {
       "error": "An error has occurred: Error: stopping sequence and returning."
   }
   ```

You can even find out more about the failed action.

1. List the last few activations:

  ```bash
  ibmcloud fn activation list -l 2
  ```

  ```bash
  Activation ID                    Kind      Start Duration   Status          Entity
  1b8144afde1244738144afde12c4732a nodejs:10 cold  46ms       developer error fail:0.0.1
  eab8ed35f2fc4236b8ed35f2fc423657 sequence  warm  96ms       developer error example:0.0.1
  ```

2. Retrieve the details of the failed action (`fail`):

  ```bash
  ibmcloud fn activation get 1b8144afde1244738144afde12c4732a
  ```

  ```json
  ok: got activation 1b8144afde1244738144afde12c4732a
  {
    ...
      "logs": [
          "20xx-11-19T16:11:46.132237Z    stderr: Error: stopping sequence and returning.",
          "20xx-11-19T16:11:46.132244Z    stderr: at NodeActionRunner.fail [as userScriptMain] (eval at initializeActionHandler (/nodejsAction/runner.js:57:23), <anonymous>:21:13)",
          "20xx-11-19T16:11:46.132248Z    stderr: at Promise (/nodejsAction/runner.js:73:35)",
          ...
      ],
      ...
  ```

  As you can see, the sequence was stopped at the failing action that you named `fail`.

{% hint style="info" %}
The use of sequences is an advanced technique that can bring serverless applications to life, but even more advanced compositions are possible using conditional logic constructs that are not covered in this introductory course.
{% endhint %}

{% hint style="success" %}
Congratulations for completing the last topic under **Create and invoke actions**! In the next section, you will explore how you might manage groups of “like” actions using packages, further enabling composition and reuse.
{% endhint %}
