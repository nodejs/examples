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

# IBM Cloud Functions using Node.js

These examples will show you how to take Node.js functions and deploy and run them within the IBM Cloud Functions (ICF) Serverless platform.  Further examples will show you how to take advantage of some of ICF's built-in features to easily realize the true power of Serverless against some of its top use cases.

If you like using ICF, you can sign-up for the *free*, self-study [Cognitve Class.ai](https://cognitiveclass.ai/) course and get [Acclaim badge](https://www.youracclaim.com/org/ibm/badge/serverless-computing-using-cloud-functions-developer-i) certified:
* [Serverless Computing using Cloud Functions - Developer I course](https://cognitiveclass.ai/courses/serverless-computing-using-cloud-functions-developer-1)

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
        * [Invoke with parameters](invoke-with-parameters)
    * [Hello world with parameters](#hello-world-with-parameters)
        * [Update action](#update-action)
        * [Invoke using command line parameters](#invoke-using-command-line-parameters)
        * [Invoke using parameter file](#invoke-using-parameter-file)
    * [ZIP actions](#zip-actions)
        * [TODO]()
* [Observations](#observations)

## Background

**Actions** are stateless code snippets (functions) that run on the ICF platform. The platform supports functions written in JavaScript (Node.js) as well as many other programming languages such as Python, Swift and Java.

Actions can be used to do many things. For example, an action can be used to respond to a database change, aggregate a set of API calls, post a Tweet, or even work with AI and analytics services to detect objects in an image or streamed video.

The ICF platform is based upon the [Apache OpenWhisk](https://openwhisk.apache.org/) project and implements an [Observer pattern](https://en.wikipedia.org/wiki/Observer_pattern) where **Actions** can be explicitly invoked or run in response to an event which **Trigger** it when connected by a **Rule**. The input to an action and the result of an action are, by default, a JSON dictionary of key-value pairs where the key is a string and the value a valid JSON value. This programming model is shown here:

![Programming model](images/ICF-Programming-Model.png)

Actions can also call other actions or even be composed into sequence of actions.  There are even specialized actions called *Web actions* that are annotated making them publicly accessible to quickly enable you to build web based applications and handle HTTP data directly with any `Content-Type`.

---

## Prerequisites

In order to run these examples, you will need to:

##### Register for and configure a free IBM Cloud Account

1. Register for a free IBM Cloud account using the linked instructions:
    - [https://cloud.ibm.com/registration](https://cloud.ibm.com/registration)

2. Make sure your account targets a region that supports IBM Cloud Functions using the following link:
    * [Target a supported regions](https://cloud.ibm.com/docs/openwhisk?topic=cloud-functions-cloudfunctions_regions) using the CLI.

##### Install the IBM Cloud Command Line Interface (CLI) and Cloud Functions plugin

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

- **[Blocking](#blocking)** - A blocking invocation request will wait for the activation result to be available.  This is done by specifying the `--blocking` flag on the command line.
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

    * **Note**: Blocking requests wait for the lesser of 60 seconds or the action's configured [time limit](https://github.com/apache/incubator-openwhisk/blob/master/docs/reference.md#per-action-timeout-ms-default-60s).  Actions that take longer will still keep running, but wou will have use the *Activation ID* to lookup the results later just like a non-blocking invocation.

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

    ```json
    {
        "payload": "Hello World!"
    }
    ```

3. Retrieve the full activation record. To get the complete activation record use the `activation get` command using the activation ID from the invocation:

    ```bash
    ibmcloud fn activation get 6bf1f670ee614a7eb5af3c9fde813043
    ```

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

<!--
## Retrieve activation records

If you forget to record the activation ID, there are a couple of `activation` commands to help you.

#### Retrieve the last activation record

1. Run the following command to get your last activation record:

    ```bash
    ibmcloud fn activation get --last
    ```

    ```json
    {
        "payload": "Hello world"
    }
    ```

#### Retrieve the recent activation list

1. Run the following command to get a list of your most recent activations:

    ```bash
    ibmcloud fn activation list
    ```

    ```bash
    Datetime   Activation ID  Kind      Start Duration Status  Entity
    y:m:d:hm:s 44794bd6...    nodejs:10 cold  34s      success <NAMESPACE>/hello:0.0.1
    y:m:d:hm:s 6bf1f670...    nodejs:10 warm  2ms      success <NAMESPACE>/hello:0.0.1
    ```

-->

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

### Invoke using command line parameters

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
    ibmcloud fn action invoke hello --result --param-file parameters.json
    ```

    ```json
    {
        "payload": "Hello, Frodo from the Shire"
    }
    ```

<!-->
### Invoke with nested parameters

Parameter values can be any valid JSON value, including nested objects. Let's update your action to use child properties of the event parameters.

1. Create the `hello-person` action with the following source code:

    ```javascript
    function main(params) {
        return {payload:  'Hello, ' + params.person.name + ' from ' + params.person.place};
    }
    ```

    ```bash
    ibmcloud fn action create hello-person hello-person.js
    ```

    Now the action expects a single `person` parameter to have the `name` and `place` fields.

2. Invoke the action with a single `person` parameter that is valid JSON:

    ```bash
    ibmcloud fn action invoke --result hello-person -p person '{"name": "Elrond", "place": "Rivendell"}'
    ```

    The result is the same because the CLI automatically parses the `person` parameter value into the structured object that the action now expects:

    ```json
    {
        "payload": "Hello, Elrond from Rivendell"
    }
    ```

{% hint style="success" %}
That was pretty easy, right? You can now pass parameters and access these values in your serverless functions. What about parameters that you need but don't want to manually pass in every time? Guess what? There’s a trick for that!
{% endhint %}
-->

<!--

## Bind default parameters

Actions can be invoked with multiple named parameters. Recall that the `hello` action from the previous example expects two parameters: the _name_ of a person and the _place_ where they're from.

Rather than pass all the parameters to an action every time, you can bind default parameters. Default parameters are stored in the platform and automatically passed in during each invocation. If the invocation includes the same event parameter, this will overwrite the default parameter value.

Let's use the `hello` action from your previous example and bind a default value for the `place` parameter.

1. Update the action by using the `--param` option to bind default parameter values:

    ```bash
    ibmcloud fn action update hello --param place Rivendell
    ```

2. Invoke the action, passing only the `name` parameter this time:

     ```bash
     ibmcloud fn action invoke --result hello --param name Elrond
     ```

     ```json
     {
        "payload": "Hello, Elrond from Rivendell"
     }
     ```

    Notice that you did not need to specify the `place` parameter when you invoked the action.

### Override a bound parameter

Default parameter bindings on an action can still be overwritten by specifying the parameter value at invocation time.

1. Invoke the action again, passing both `name` and `place` values:

    ```bash
    ibmcloud fn action invoke --result hello --param name Elrond --param place "the Lonely Mountain"
    ```

    ```json
    {
        "payload": "Hello, Elrond from the Lonely Mountain"
    }
    ```

Notice that the command line value overwrites the value that was bound to the action.

{% hint style="warning" %}
Once parameters are bound, there is no current way to unbind them; you will have to delete the entire action and start over binding only the parameters you want.
{% endhint %}

## Observations

Default parameters are great for handling parameters like authentication keys for APIs. Letting the platform pass them in automatically means you don't have to include these keys in invocation requests or include them in the action source code. Neat, right?

-->


### Observations

- **No special code is needed**. You can code with your favorite language!
  - By convention, the `main` function is called. You can always alias "main" to any function in your `.js` file.
- **No build step**. Runtimes for all supported languages are already deployed in ICF server clusters waiting for your function to be deployed and invoked.
- **Node.js runtime inferred**. The Node.js runtime was inferred via the function's `.js` extension. ICF will always use the latest supported Node.js runtime version unless you explicitly set another version with the `--kind` flag _This is not discussed in this course_.
- Your action was installed into an IBM Cloud namespace. This will allow you to apply Identity and Access Management (IAM) control to all actions in a namespace _This is not discussed in this course_.