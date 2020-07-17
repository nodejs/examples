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
