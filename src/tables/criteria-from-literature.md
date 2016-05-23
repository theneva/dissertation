| Criterion | Reference | Description | Unit
| ------------------------- | --------------------- |  ------------------------------------------- | --------------------|
| Configuration code LOC | @talwar:comparison-of-approaches-to-service-deployment:2005 | How much code must be written to enable deployment for a new service? | (None, Low, Moderate, High)
| Steps to deploy | @talwar:comparison-of-approaches-to-service-deployment:2005 | How many manual steps are required to perform a single deployment? | Step count (integer)
| Modifiability | @bass-clements-kazman:software-architecture-in-practice:2013; @talwar:comparison-of-approaches-to-service-deployment:2005 | How much code must be written to modify the configuration? | (None, Low, Moderate, High)
| Time to deploy | @talwar:comparison-of-approaches-to-service-deployment:2005 | How long does it take to deploy a change? | (Seconds, Few minutes, Several minutes, Hours)
| Learning curve | @talwar:comparison-of-approaches-to-service-deployment:2005 | How much effort is required to use the deployment configuration? | (Difficult, Moderate, Simple)
| Retention | @talwar:comparison-of-approaches-to-service-deployment:2005 | To which extent is the deployment configuration simple enough to recall, rather than re-learn? | (Low, Moderate, High)
| DevOps efficacy | @spinellis:by-hand:2012 | Can developers safely deploy their own changes to production? | True?
| Self-documenting configuration | @armour:laws:2007; @talwar:comparison-of-approaches-to-service-deployment:2005 | To which extent does the configuration code itself double as documentation of the non-functional requirements that led to the configuration, eliminating the need to document these elsewhere? | True?
| Only twelve factors | @chen:architecting-for-cd:2015, The Twelve-Factor App^[http://12factor.net] | How many ASRs are imposed on the service beyond following the guidelines known as The Twelve-Factor App? | (Many, Few, None)
| Same-host duplicates | -- | Can multiple instances and versions of the same service run on a single host? | (Simple, With custom configuration, Unfeasible)

Table: Criteria identified in the literature review {#tbl:criteria-from-literature}
