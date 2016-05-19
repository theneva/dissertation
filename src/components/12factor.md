The Twelve-Factor App methodology is a set of twelve guidelines that aim to:

- transparentise configuration to reduce the effort required by new developers to understand the setup;
- maximise portability between execution environments;
- simplify deployment, particularly to a cloud environment;
- enable continuous delivery by separating development and production; and
- allow scaling a service without significant changes.

The guidelines are all attempts at establishing _best practices_, and are independent of programming language and execution environment. These will be used as a basis for comparing the interview data to that of the literature review.

The first factor, __Codebase__^[http://12factor.net/codebase], states that any one service should be container in exactly one codebase, tracked with revision control. This one code base should be deployed… TODO

Of particular interest are … TODO: describe the most interesting factors, and mention the others briefly.

#### 12factor and the reference apps

TODO move this to the discussion, or at least results

The Twelve-Factor app guidelines are simply a collection of best practises based on the authoring developers' own experience and well-established architectural concerns. As we will see later in the thesis, several of the factors play a major role when targeting multiple execution environments.

For example, although it is outside the scope of this thesis, factor 10 (__Dev/prod parity__^[http://12factor.net/dev-prod-parity]) becomes particularly apparent when the QA pipeline contains multiple Environments, such as one _development_ and one _production_ environment, and these run on different configurations. The interviews showed that one real scenario is having a self-hosted production environment, but using a cloud provider for hosting development and testing environments. The testing environment must not differ functionally from the production environment, even though the underlying infrastructures may be completely different.
 
These guidelines generally make the code base simpler and more flexible in terms of deployment configuration. For this reason, all of the reference applications used to test the framework will try to conform with the Twelve Factors. This should make the comparison of various deployment strategies as fair as possible.
