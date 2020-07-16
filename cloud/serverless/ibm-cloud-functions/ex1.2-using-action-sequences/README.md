# Use action sequences

This exercise will explain how to use sequences to compose new meta-actions from existing actions on IBM Cloud Functions (ICF).

Once you have completed this exercise, you will:

* Understand what action sequences do and how they work.
* Know how to create, deploy, and invoke a sample action sequence.
* Have used deliberate errors to stop processing the action sequence.

More importantly, you will be able to use action sequences on ICF!

## Background

Developers often want to build actions as reusable components which can be combined to build higher-order serverless functions.

For example, what if you have serverless functions to implement an external API and want to enforce HTTP authentication? Rather than manually replicating the same authentication code across all action handlers, you can build an authentication action which can be invoked programmatically at runtime.

Unfortunately, this approach does incur additional charges. The application will be charged twice when the authentication function is called, as the calling action has to sit idle waiting for the response from the authentication function.

{% hint style="success" %}
Fortunately, ICF has a special type of action, called action sequences, that resolve this problem!
{% endhint %}
