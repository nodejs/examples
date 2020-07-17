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

## Background

**Actions** are stateless code snippets (functions) that run on the ICF platform. The platform supports functions written in JavaScript (Node.js) as well as many other programming languages such as Python, Swift and Java.

Actions can be used to do many things. For example, an action can be used to respond to a database change, aggregate a set of API calls, post a Tweet, or even work with AI and analytics services to detect objects in an image or streamed video.

The ICF platform is based upon the [Apache OpenWhisk](https://openwhisk.apache.org/) project and implements an [Observer pattern](https://en.wikipedia.org/wiki/Observer_pattern) where **Actions** can be explicitly invoked or run in response to an event which **Trigger** it when connected by a **Rule**. The input to an action and the result of an action are, by default, a JSON dictionary of key-value pairs where the key is a string and the value a valid JSON value. This programming model is shown here:

![Programming model](images/ICF-Programming-Model.png)

Actions can also call other actions or even be composed into sequence of actions.  There are even specialized actions called *Web actions* that are annotated making them publicly accessible to quickly enable you to build web based applications and handle HTTP data directly with any `Content-Type`.

## Prerequisites

In order to run these examples, you will need to:

##### Register for and configure a free IBM Cloud Account

1. Register for a free IBM Cloud account using the linked instructions:
    - [https://cloud.ibm.com/registration](https://cloud.ibm.com/registration)

2. Make sure your account targets a region that supports IBM Cloud Functions using the following link:
    - [Target a supported regions](https://cloud.ibm.com/docs/openwhisk?topic=cloud-functions-cloudfunctions_regions) using the CLI.

##### Install the IBM Cloud Command Line Interface (CLI) and Cloud Functions plugin

1. Install the [IBM Cloud Command Line Interface (CLI)](https://cloud.ibm.com/docs/cli?topic=cloud-cli-getting-started) by following the steps outlined on the linked page.

2. Install the [Cloud Functions (CF)](https://cloud.ibm.com/functions/learn/cli) plugin by following the steps outlined on the linked page.
    - *New accounts will automatically have a single `Namespace` (represented by a UUID) and `Resource Group` (called `Default`) created.*

---

## Examples

in ICF. An action represents the serverless function, along with its conventions and metadata. Please note that the word _function_ used synonymously with the term _action_ since actions contain the functional source code, which action metadata is built around.

### Hello World!

#### Create and Invoke

The following steps and examples demonstrate how to create your first JavaScript action.

1. Create a JavaScript file named `hello.js` with these contents:

    ```javascript
    function main() {
        return {payload: 'Hello world'};
    }
    ```

    The JavaScript file might contain additional functions. However, by convention, a function called `main` is the default entry point for the action.

2. Create an action from the `hello.js` JavaScript function, naming it `hello`:

    ```bash
    ibmcloud fn action create hello hello.js
    ```

    ```text
    ok: created action hello
    ```

3. List all actions. The `hello` action you just created should show:

    ```bash
    ibmcloud fn action list
    ```

    ```text
    actions
    <NAMESPACE>/hello       private    nodejs10
    ```

    You can see the `hello` action you just created under your account's default `NAMESPACE` and it is, by default, marked `private` with no external endpoint.

#### Invoking Hello World!

After you create your action, you can run it on ICF with the `invoke` command using one of two modes:

- **Blocking** which will wait for the result (request-response style) by specifying the `--blocking` flag on the command line.

- **Non-blocking** which will invoke the action immediately, but not wait for a response.

#### Blocking invocations

A blocking invocation request will wait for the activation result to be available.

1. Invoke the `hello` action using the command line as a blocking activation:

    ```bash
    ibmcloud fn action invoke --blocking hello
    ```

    The command outputs the **Activation ID** for the per-invocation **activation record** along with the function's complete `response`:

    ```bash
    ok: invoked /_/hello with id 44794bd6aab74415b4e42a308d880e5b
    ```

    The JavaScript function's output is the string `Hello world` which appears as the value of the `payload` key:

    ```json
    ...
    "response": {
          "result": {
              "payload": "Hello world"
          },
          "size": 25,
          "status": "success",
          "success": true
      },
      ...
    ```

    *Blocking requests wait for the lesser of 60 seconds or the action's configured [time limit](https://github.com/apache/incubator-openwhisk/blob/master/docs/reference.md#per-action-timeout-ms-default-60s).  Actions that take longer will still keep running, but wou will have to request that activation record later just like a non-blocking request*

#### Non-blocking invocations

A non-blocking invocation will invoke the action immediately, but not wait for a response.

If you don't need the action result right away, you can omit the `--blocking` flag to make a non-blocking invocation. You can get the result later by using the activation ID.

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
        "payload": "Hello world"
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
              "payload": "Hello world"
          },
          "size": 25,
          "status": "success",
          "success": true
      },
      ...
    }
    ```

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

## Observations

{% hint style="tip" %}
- **No special code is needed**. You can code with your favorite language!
  - By convention, the `main` function is called. You can always alias "main" to any function in your `.js` file.
- **No build step**. Runtimes for all supported languages are already deployed in ICF server clusters waiting for your function to be deployed and invoked.
- **Node.js runtime inferred**. The Node.js runtime was inferred via the function's `.js` extension. ICF will always use the latest supported Node.js runtime version unless you explicitly set another version with the `--kind` flag _This is not discussed in this course_.
- Your action was installed into an IBM Cloud namespace. This will allow you to apply Identity and Access Management (IAM) control to all actions in a namespace _This is not discussed in this course_.
