# Conclusion

Selecting a strategy and technology stack for continuous delivery in a microservice context is a difficult task. The overarching goal for this thesis was to provide system architects with a tool for evaluating and comparing such strategies.
This concluding chapter summarises the thesis and the key findings and contributions, and finally suggests areas of future research.

## Thesis summary

Chapter 1, Introduction, provided a context and motivation for researching Continuous Delivery of microservices.

Chapter 2, Background, introduced some key themes relating to microservices and Continuous Delivery, and provided a foundation for defining a set of strategy characteristics.

Chapter 3, Method, presented a research design for gathering data to create and evaluate a relevant framework for strategy evaluation. The method involved first learning from the current literature and industry to define an initial set of deployment strategy characteristics to build a framework, and then maturing said framework by applying it to some controlled deployment configurations.

Chapter 4, Results, first showed data gathered through interviews with employees at FINN.no. It then presented experiences from deploying the BeerFave microservices based on its technical requirements.

Finally, chapter 5, Discussion, defined a set of deployment strategy characteristics of interest in an evaluation of strategies based on the literature and interview data, and determined possible units for each characteristic. These characteristics and units were formalised as a framework represented by a table. Ultimately, this framework was iteratively applied to some strategies for Continuous Delivery, resulting in an incrementally matured framework.

## Findings and contributions

This study set out to answer the following research questions:

```include
src/components/research-questions.md
```

Evaluation is a precondition for comparison. Thus, answering Research Question 1 required a means of evaluating strategies for Continuous Delivery of microservices. This was completed through identifying a set of characteristics and units that are likely to impact the strategy's success rate in the development project. In order to allow comparison of the evaluations, these characteristics were formalised as a framework in table form and incrementally matured. The final revision of this framework is the answer to Research Question 1.

The framework was matured through applying it to evaluate some deployment strategies. A comparison of the evaluated strategies was produced as a side-effect of the maturing process. This comparison _begins_ to answer Research Question 2, and it is possible to expand on this answer by applying the framework to further strategies.

This study's primary research contribution is the evaluation and comparison framework, which is comprised of the set of characteristics mapped to units. The framework is designed to be modifiable: a user of the framework may freely add, change, or remove characteristics to make the framework better suited to their context.

The results from the evaluation are a secondary contribution. For example, the background chapter showed an academic consensus that automation is a necessity in Continuous Delivery. The evaluation performed in this study is consistent with this proposition, but also helps contrast manual and automated deployment further.

## Future work

This study has answered its research questions. However, there are many aspects of continuously deploying microservices that have not been considered. In particular, the organisational impact of introducing Continuous Delivery in a microservice is a highly relevant object of study.

The evaluation and comparison framework is presented in a third revision to conclude this study, but it can still be greatly improved by applying it to other contexts, such as a container-based microservice environment. Also of relevance is looking at multiple technology stacks and approaches to automating deployment, as these may yield different results. The framework is delivered as a tested iteration of a work in progress: it must be applied in multiple realistic contexts in order to reach a simpler and more focused state.

The interviews only provided a single point of insight into the state of the art in Continuous Delivery of microservices. This effort is led by the industry, and so further case studies, engaged scholarships, and other projects to identify and explain the efforts will be valuable contributions to the literature.

There is an abundance of ways to implement delivery, which is only added to by the introduction of microservices. The contexts of each project, system, team, and organisation will always be unique, although this study has presented an attempt at generalising them. There is, then, no perfect way of providing a single framework that will fit all needs. This framework attempts to compensate for this inconsistency by being modifiable and extensible by design. Nonetheless, further work must be completed to fill the gap in the current literature between continuous delivery and a microservice environment.
