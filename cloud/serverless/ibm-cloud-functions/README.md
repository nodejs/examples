<!--
Copyright 2020 IBM Corporation

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
-->

<!--
# Contributors:
# - Matt Rutkowski, IBM
-->

# IBM Cloud Functions using Node.js

These examples will show you how to take Node.js functions and deploy and run them within the IBM Cloud Functions (ICF) Serverless platform. Further examples will show you how to take advantage of some of ICF's built-in features to easily realize the true power of Serverless against some of its top use cases.

If you like using ICF, you can sign-up for the *free*, self-study [Cognitve Class.ai](https://cognitiveclass.ai/) course and get [Acclaim badge](https://www.youracclaim.com/org/ibm/badge/serverless-computing-using-cloud-functions-developer-i) certified:

* [Serverless Computing using Cloud Functions - Developer I course](https://cognitiveclass.ai/courses/serverless-computing-using-cloud-functions-developer-1)

---

## Index

* [Background](#background)
* [Prerequisites](#prerequisites)
* [Examples](#examples)
  * [Hello world](#hello-world)
    * [Create and list action](#create-and-list-action)
    * [Invoke action](#invoke-action)
      * [Blocking invocation (results only)](#blocking-invocation-results-only)
      * [Blocking invocation (full response)](#blocking-invocation-full-response)
      * [Non-blocking invocation](#non-blocking-invocation)
    * [Invoke with parameters](#invoke-with-parameters)
  * [Hello world with parameters](#hello-world-with-parameters)
    * [Update action](#update-action)
    * [Invoke using command line parameters](#invoke-using-command-line-parameters)
    * [Invoke using parameter file](#invoke-using-parameter-file)
  * [ZIP action](#zip-action)- *packaging npm modules dependencies*
  * [Asynchronous action](#asynchronous-action) - *using Promises*
  * [Web actions](#web-actions) - *automatically making action output web-accessible using [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)*
    * [Hello HTML](#hello-html) - *create HTML content*
      * [Using query parameters](#using-query-parameters)
    * [Atomic SVG](#atomic-svg) - *create SVG content*
  * [Sequencing actions](#sequencing-actions) - *create new actions composed of sequences of existing actions*

* [Observations](#observations)

---

## Background

**Actions** are stateless code snippets (functions) that run on the ICF platform. The platform supports functions written in JavaScript (Node.js) as well as many other programming languages such as Python, Swift and Java.

Actions can be used to do many things. For example, an action can be used to respond to a database change, aggregate a set of API calls, post a Tweet, or even work with AI and analytics services to detect objects in an image or streamed video.

The ICF platform is based upon the [Apache OpenWhisk](https://openwhisk.apache.org/) project and implements an [Observer pattern](https://en.wikipedia.org/wiki/Observer_pattern) where **Actions** can be explicitly invoked or run in response to an event which **Trigger** it when connected by a **Rule**. The input to an action and the result of an action are, by default, a JSON dictionary of key-value pairs where the key is a string and the value a valid JSON value. This programming model is shown here:

![Programming model](images/ICF-Programming-Model.png)

Actions can also call other actions or even be composed into sequence of actions. There are even specialized actions called *Web actions* that are annotated making them publicly accessible to quickly enable you to build web based applications and handle HTTP data directly with any `Content-Type`.

---

## Prerequisites

In order to run these examples, you will need to:

### Register for and configure a free IBM Cloud Account

1. Register for a free IBM Cloud account using the linked instructions:
    - [https://cloud.ibm.com/registration](https://cloud.ibm.com/registration)

2. Make sure your account targets a region that supports IBM Cloud Functions using the following link:
    * [Target a supported region](https://cloud.ibm.com/docs/openwhisk?topic=cloud-functions-cloudfunctions_regions) using the CLI.

### Install the IBM Cloud Command Line Interface (CLI) and Cloud Functions plugin

1. Install the [IBM Cloud Command Line Interface (CLI)](https://cloud.ibm.com/docs/cli?topic=cloud-cli-getting-started) by following the steps outlined on the linked page.

2. Install the [Cloud Functions (CF)](https://cloud.ibm.com/functions/learn/cli) plugin by following the steps outlined on the linked page.
    * *New accounts will automatically have a single `Namespace` (represented by a UUID) and `Resource Group` (called `Default`) created.*

---

## Examples

In ICF, an action represents the serverless function, along with its conventions and metadata. Please note that the word _function_ used synonymously with the term _action_ since actions contain the functional source code, which action metadata is built around.

### Hello world

#### Create and list action

The following steps and examples demonstrate how to create your first JavaScript action.

1. Create a JavaScript file named `hello.js` with this function:

    ```javascript
    function main() {
        return {payload: 'Hello World!'};
    }
    ```

    The JavaScript file might contain additional functions. However, by convention, a function called `main` is the default entry point for the action.

2. Create an action from the `hello.js` JavaScript function, naming it `hello`:

    ```bash
    ibmcloud fn action create hello hello.js
    ```

    ```bash
    ok: created action hello
    ```

3. List all actions. The `hello` action you just created should show:

    ```bash
    ibmcloud fn action list
    ```

    ```bash
    actions
    <NAMESPACE>/hello       private    nodejs10
    ```

    You can see the `hello` action you just created under your account's default `NAMESPACE` and it is, by default, marked `private` with no external endpoint.

#### Invoke action

After you create your action, you can run it on ICF with the `invoke` command using one of two modes:

- **[Blocking](#blocking)** - A blocking invocation request will wait for the activation result to be available. This is done by specifying the `--blocking` flag on the command line.
- **[Non-blocking](#non-blocking)** - A non-blocking invocation will invoke the action immediately, but not wait for a response.

##### Blocking invocation (results only)

If you wish to see only the function's output `payload`, you can use the `--result` flag or its short form `-r` to perform an implied blocking invocation request.

1. Invoke the `hello` action requesting the results only:

    ```bash
    ibmcloud fn action invoke hello --result
    {
        "payload": "Hello World!"
    }
    ```

##### Blocking invocation (full response)

If you wish to wait for the full HTTP response, simply use the `--blocking` flag.

1. Invoke the `hello` action using the command line as a blocking activation:

    ```bash
    ibmcloud fn action invoke hello --blocking
    ```

    The first line provides a per-invocation *Activation ID* which can be used at any time to lookup the complete *Activation record* which follows.

    ```bash
    ok: invoked /_/hello with id 44794bd6aab74415b4e42a308d880e5b
    ```

    The remaining lines show the complete JSON *Activation record* which contains the response and a `payload` key whose value is the function's result:

    ```json
    ...
    "response": {
          "result": {
              "payload": "Hello World!"
          },
          "size": 26,
          "status": "success",
          "success": true
      },
      ...
    ```

    * **Note**: Blocking requests wait for the lesser of 60 seconds or the action's configured [time limit](https://github.com/apache/incubator-openwhisk/blob/master/docs/reference.md#per-action-timeout-ms-default-60s). Actions that take longer will still keep running, but wou will have use the *Activation ID* to lookup the results later just like a non-blocking invocation.

##### Non-blocking invocation

A non-blocking invocation will invoke the action immediately, but not wait for a response.  In this case, the *Activation ID* will be used to find the results.

1. Invoke the `hello` action using the command line as a non-blocking activation:

    ```bash
    ibmcloud fn action invoke hello
    ```

    ```bash
    ok: invoked /_/hello with id 6bf1f670ee614a7eb5af3c9fde813043
    ```

2. Retrieve the activation result using the activation ID from the invocation:

    ```bash
    ibmcloud fn activation result 6bf1f670ee614a7eb5af3c9fde81304
    ```

    You should see similar output as when you previously used the `--result` flag on the `invoke` command.

    <details>
    <summary>Sample output:</summary>

    ```json
    {
        "payload": "Hello World!"
    }
    ```

    </details>

3. Retrieve the full activation record. To get the complete activation record use the `activation get` command using the activation ID from the invocation:

    ```bash
    ibmcloud fn activation get 6bf1f670ee614a7eb5af3c9fde813043
    ```

    You should see the complete activation record as when you previously sed the `--blocking` flag on the `invoke` command.

    <details>
    <summary>Sample output:</summary>

    ```json
    ok: got activation 6bf1f670ee614a7eb5af3c9fde813043
    {
      ...
      "response": {
          "result": {
              "payload": "Hello World!"
          },
          "size": 25,
          "status": "success",
          "success": true
      },
      ...
    }
    ```

    </details>

4. Retrieve the last activation record:

    ```bash
    ibmcloud fn activation get --last
    ```

5. Retrieve the msot recent recent activation list:

    ```bash
    ibmcloud fn activation list
    ```

    <details>
    <summary>Sample output:</summary>

    ```bash
    Datetime   Activation ID  Kind      Start Duration Status  Entity
    y:m:d:hm:s 44794bd6...    nodejs:10 cold  34s      success <NAMESPACE>/hello:0.0.1
    y:m:d:hm:s 6bf1f670...    nodejs:10 warm  2ms      success <NAMESPACE>/hello:0.0.1
    ```

    </details>

    Note: the last 'N' cached activations are shown.

### Hello world with parameters

Event parameters can be passed to an action's function when it is invoked. Let's look at a sample action which uses the parameters to calculate the return values.

#### Update action

1. Update the file `hello.js` with the following source code:

    ```javascript
    function main(params) {
        return {payload:  'Hello, ' + params.name + ' from ' + params.place};
    }
    ```

2. Update the `hello` action with the updated source code file:

    ```bash
    ibmcloud fn action update hello hello.js
    ```

#### Invoke using command line parameters

When invoking actions through the command line, parameter values can be explicitly passed using the `—param` flag or the shorter `-p` flag.

1. Invoke the `hello` action using explicit command-line parameters using the `--param` flag:

    ```bash
    ibmcloud fn action invoke --result hello --param name Elrond --param place Rivendell
    ```

    Or you can use the `-p` short form:

    ```bash
    ibmcloud fn action invoke --result hello -p name Elrond -p place Rivendell
    ```

    ```json
    {
        "payload": "Hello, Elrond from Rivendell"
    }
    ```

### Invoke using parameter file

You can also pass parameters from a file containing the desired content in JSON format. The filename must then be passed using the `--param-file` flag.

1. Create a file named `parameters.json` containing the following JSON:

    ```json
    {
        "name": "Frodo",
        "place": "the Shire"
    }
    ```

2. Invoke the `hello` action using parameters from the JSON file:

    ```bash
    ibmcloud fn action invoke hello --param-file parameters.json --result
    ```

    ```json
    {
        "payload": "Hello, Frodo from the Shire"
    }
    ```

### ZIP action

The NodeJS runtime, where your function executes, has a [fixed list of installed npm modules](https://cloud.ibm.com/docs/openwhisk?topic=openwhisk-runtimes#openwhisk_ref_javascript_environments). If you require more npm modules, you can ZIP them with your action code.

#### Fantasy name generator

This example shows how to package a fun npm module called [Fantasy Name Generator](https://www.npmjs.com/package/fantasy-name-generator) with an action function.

1. Create a project directory and change into it:

```bash
mdkir namegen
cd namegen
```

2. Create `namegen.js` with the following code:

```javascript
function namegen(params) {

    const generator = require('fantasy-name-generator');
    const usage = "-p race [see https://www.npmjs.com/package/fantasy-name-generator] -p gender [male|female]"

    if (params === undefined || params.race === undefined ||
        params.gender === undefined || ( params.gender != 'male' && params.gender != 'female' )) {
            return { usage: usage };
        }

    var name = generator.nameByRace(params.race,{gender: params.gender});

    return{ name: name };
}

exports.main = namegen;
```

3. Create `package.json` with these contents:

```javascript
{
  "name": "namegen",
  "version": "1.0.0",
  "description": "Serverless fantasy name generator",
  "main": "namegen.js",
  "dependencies": {
    "fantasy-name-generator": "^2.0.0"
  }
}
```

4. Install npm required modules locally:

```bash
npm install
```

5. ZIP the project files with local `node_modules`:

```bash
zip -r action.zip *
```

6. Create the action

Since a ZIP action does not have a `.js` extension, we must use the `--kind` parameter to tell ICF what runtime and version to use (`default` to latest in this example):

```bash
ibmcloud fn action update namegen action.zip --kind nodejs:default
```

7. Invoke the action with parameters (block for `-r` result):

```bash
ibmcloud fn action invoke namegen -p race human -p gender female -r
{
    "name": "Aldrella"
}

```

### Asynchronous action

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

2. Create the action and invoke it:

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

2. Fetch the last activation log to see how long the async. activation took to complete:

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

### Web actions

Web actions are actions that can be called externally using the HTTP protocol from clients like `curl` or web browsers. IBM Cloud Functions (ICF) provides a simple flag, `--web true`, which causes it to automatically create an HTTP accessible URL (endpoint) for any action.

These example here will only give you a basic idea of what is possible. To see more read [Creating web actions](https://cloud.ibm.com/docs/openwhisk?topic=cloud-functions-actions_web.)

#### Hello HTML

If you want to dynamically generate HTML content for web browser access, functions are a great way to do so based upon the latest backend data.

1. Create a new web action named `html` from the following source code in html.js:

      ```javascript
      function main(params) {
         let html = '<html><body><h3><span style="color:red;">Hello ' + params.name + '!</span></h3></body></html>'
         return { headers: { "Content-Type": "text/html" },
                  statusCode: 200,
                  body: html };
      }
      ```

      ```bash
      ibmcloud fn action create html html.js --web true
      ```

2. Retrieve the URL for the web action:

      ```bash
      ibmcloud fn action get html --url
      ```

      ```bash
      ok: got action html
      https://us-south.functions.appdomain.cloud/api/v1/web/3cc8e80c-1e29-4d99-b530-a89bf13fee32/default/html
      ```

3. Copy and paste the link into your browser:

##### Using query parameters

4. Append the following query parameter at the end if the URL and refresh your browser:

    ```bash
    ?name=Hanna
    ```

#### Atomic SVG

You can generate SVG graphics such as statistical or usage graphs based upon live data using a cloud function.

1. Create a file named `atom.js` with the following code that returns base64-encoded SVG content in the HTTP `body`:

      ```javascript
      // The SVG XML image source has been base64 encoded in the "body" param below:
      function main() {
         return { headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'No-Store' },
            statusCode: 200,
            body: `PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii01MiAtNTMgMTAwIDEwMCIgc3Ryb2tlLXdpZHRoPSIyIj4NCiA8ZyBmaWxsPSJub25lIj4NCiAgPGVsbGlwc2Ugc3Ryb2tlPSIjNjY4OTlhIiByeD0iNiIgcnk9IjQ0Ii8+DQogIDxlbGxpcHNlIHN0cm9rZT0iI2UxZDg1ZCIgcng9IjYiIHJ5PSI0NCIgdHJhbnNmb3JtPSJyb3RhdGUoLTY2KSIvPg0KICA8ZWxsaXBzZSBzdHJva2U9IiM4MGEzY2YiIHJ4PSI2IiByeT0iNDQiIHRyYW5zZm9ybT0icm90YXRlKDY2KSIvPg0KICA8Y2lyY2xlICBzdHJva2U9IiM0YjU0MWYiIHI9IjQ0Ii8+DQogPC9nPg0KIDxnIGZpbGw9IiM2Njg5OWEiIHN0cm9rZT0id2hpdGUiPg0KICA8Y2lyY2xlIGZpbGw9IiM4MGEzY2YiIHI9IjEzIi8+DQogIDxjaXJjbGUgY3k9Ii00NCIgcj0iOSIvPg0KICA8Y2lyY2xlIGN4PSItNDAiIGN5PSIxOCIgcj0iOSIvPg0KICA8Y2lyY2xlIGN4PSI0MCIgY3k9IjE4IiByPSI5Ii8+DQogPC9nPg0KPC9zdmc+`
         };
      }
      ```

2. Create a web action named `atom`:

      ```bash
      ibmcloud fn action create atom atom.js --web true
      ```

3. Get the URL for the new atom web action:

      ```bash
      ibmcloud fn action get atom --url
      ```

      ```bash
      ok: got action atom
      https://us-south.functions.cloud.ibm.com/api/v1/web/josephine.watson%40us.ibm.com_ns/default/atom
      ```

3. Copy and paste the URL into your browser to see the image!

      ![atom.svg](images/atom.svg)

*If you want, you can save the [unencoded SVG XML source](images/atom.svg) to your local computer and view it in a text editor.*

---

### Sequencing actions

IBM Cloud Functions (ICF) supports a kind of action called a sequence. Sequence actions are created using a list of existing actions. When the sequence action is invoked, each action is executed in order of the action parameter list. Input parameters are passed to the first action in the sequence. Output from each function in the sequence is passed as the input to the next function and so on. The output from the last action in the sequence is returned as the response result.

*Sequences are themselves treated as normal actions. You create, invoke, and manage them as actions through the CLI.*

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

---

## Observations

- **No special code is needed**. You can code with your favorite language!
  - By convention, the `main` function is called. You can always alias "main" to any function in your `.js` file.
- **No build step**. Runtimes for all supported languages are already deployed in ICF server clusters waiting for your function to be deployed and invoked.
- **Node.js runtime inferred**. The Node.js runtime was inferred via the function's `.js` extension. ICF will always use the latest supported Node.js runtime version unless you explicitly set another version with the `--kind` flag.
- **Package dependencies as ZIP files**. Complex actions can be constructed by packaging required npm modules within a ZIP file.
- **Promises are supported by default** since ICF invokes functions asynchronously.
- **Creating websites from function output is easy**. You do not need to host a traditional application server to create dynamic content.
- Composing existing actions into new actions using **Sequences** can allow you to create powerful data transformation pipelines.
- **Secure namespaces**. Your action executes in an IBM Cloud namespace; a default namespace is used if none is supplied. This allows you to apply Identity and Access Management (IAM) control to all actions in a namespace _which is not included in these examples_.

---

### Troubleshooting

* The first step is to make sure you have the latest version of the ICF plugin installed:

```bash
ibmcloud plugin list
ibmcloud plugin update
```
