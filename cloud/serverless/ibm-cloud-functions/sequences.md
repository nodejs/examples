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

### Sequencing actions

IBM Cloud Functions (ICF) supports a kind of action called a sequence. Sequence actions are created using a list of existing actions. When the sequence action is invoked, each action is executed in order of the action parameter list. Input parameters are passed to the first action in the sequence. Output from each function in the sequence is passed as the input to the next function and so on. The output from the last action in the sequence is returned as the response result.

*Sequences behave like normal actions. You create, invoke, and manage them as actions through the CLI.*

1. Create the file `funcs.js` and add the following functions:

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

2. Create the following three actions:

    ```bash
    ibmcloud fn action create split funcs.js --main split
    ```

    ```bash
    ibmcloud fn action create reverse funcs.js --main reverse
    ```

    ```bash
    ibmcloud fn action create join funcs.js --main join
    ```

*Notice how our JavaScript source code had no `main` function. Instead, when we created each action, we supplied the name of the function to be used as its `main` function using the flag `--main`.*

3. Test each action to verify it is working.

    The function `split` takes the single string `hello world` and splits it into a JSON map of the individual `strings` using the space character as the delimiter.

    ```bash
    ibmcloud fn action invoke split --result --param text "Hello world"
    ```

    <details>
    <summary>Sample output:</summary>
    ```json
    {
        "words": [
            "Hello",
            "world"
        ]
    }
    ```
    </details>

    The function `reverse` takes a JSON array of `strings` and reverses the characters in each.

    ```bash
    ibmcloud fn action invoke reverse --result --param words '["hello", "world"]'
    ```

    <details>
    <summary>Sample output:</summary>
    ```json
    {
        "words": [
            "olleh",
            "dlrow"
        ]
    }
    ```
    </details>

    The function `join` takes the JSON array of `strings` and concatenates them back into a space-delimited string.

    ```bash
    ibmcloud fn action invoke join --result --param words '["hello", "world"]'
    ```

    <details>
    <summary>Sample output:</summary>
    ```json
    {
        "text": "hello world"
    }
    ```
    </details>

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

#### Observations

*The use of sequences is an advanced technique that can bring serverless applications to life, but even more advanced compositions are possible using conditional logic constructs that are not covered in these examples.*
