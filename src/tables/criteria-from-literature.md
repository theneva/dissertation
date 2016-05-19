| Criterion | Reference | Description | Unit
| ------------------------- | --------------------- |  ------------------------------------------- | --------------------|
| Configuration code LOC for a new service | @talwar:comparison-of-approaches-to-service-deployment:2005 | How much code must be written to enable deployment for a service? | Range (LOC)
| Number of steps involved in a single deployment | @talwar:comparison-of-approaches-to-service-deployment:2005 | The number of steps required to perform a single deployment | Integer (step count)
| Modifiability: LOC to express configuration changes | @bass-clements-kazman:software-architecture-in-practice:2013; @talwar:comparison-of-approaches-to-service-deployment:2005 | How much code must be written to change the configuration? | Range (LOC)
| Time to deploy a change | @talwar:comparison-of-approaches-to-service-deployment:2005 | How long does it take to make a change, e.g., fix a bug, test the new code, and deploy it to production? | Range (minutes)
| Barrier to first use | @talwar:comparison-of-approaches-to-service-deployment:2005 | Learning curve: the amount of prerequisite knowledge and skills required to operate and maintain the strategy (beyond absolutely required knowledge such as the Linux shell) | High; Medium; Low.
| Feasibility of DevOps | @spinellis:by-hand:2012 | Can developers feasibly deploy their own changes to production ? | True?
| Configuration as documentation | @armour:laws:2007; @talwar:comparison-of-approaches-to-service-deployment:2005 | To which extent does the configuration code itself double as documentation of the non-functional requirements that led to the configuration, eliminating the need to document these elsewhere? | Full; Some; Little
| No ASRs beyond 12-factor app | @chen:architecting-for-cd:2015 | Following the 12-factor guidelines should be enough (from the software architecture perspective) to deploy to any runtime | (None; Somewhat; Completely)
| Same-host duplicates | TODO | Possibility to run multiple instances of the same application on a single host | Impossible; Possible; Easy

Table: Criteria identified in the literature review.
