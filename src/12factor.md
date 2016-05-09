# The Twelve-Factor App

- Heroku (the most popular "pure" PaaS)
- Collection of best practises from both literature (based on experiences) and authors' experiences

As mentioned in the previous section, The Twelve-Factor App methodology^[http://12factor.net] is a set of twelve guidelines that aim to:

- transparentise configuration to reduce the effort required by new developers to understand the setup;
- maximise portability between execution environments;
- simplify deployment, particularly to a cloud environment;
- enable continuous delivery by separating development and production; and
- allow scaling the service without significant changes.

The guidelines are all attempts at establishing _best practices_, and are independent of programming language and execution environments. These will be used as a basis for comparing the interview data to that of the literature review.

The first factor, __Codebase__^[http://12factor.net/codebase], states that any one service should be container in exactly one codebase, tracked with revision control. This one codebase should be deployed 

Of particular interest are … TODO

## 12factor and the reference apps

The Twelve-Factor app guidelines are simply a collection of best practises based on the authoring developers' own experience and well-established architectural concerns. As we will see later in the thesis, several of the factors play a major role when targeting multiple execution environments.

For example, although it is outside the scope of this thesis, factor 10 (Dev/prod parity^[http://12factor.net/dev-prod-parity]) becomes particularly apparent when the QA pipeline contains multiple Environments, such as one _development_ and one _production_ environment, and these run on different configurations. The interviews showed that one real scenario is having a self-hosted production environment, but using a cloud provider for hosting development and testing environments. The testing environment must not differ functionally from the production environment, even though the underlying infrastructures may be completely different.

These guidelines generally make the code base simpler and more flexible in terms of deployment configuration. For this reason, all of the reference applications used to test the Framework will try to conform with the Twelve Factors. These principles will also be used actively in the next section, which discusses various criteria to include in the Framework itself.
