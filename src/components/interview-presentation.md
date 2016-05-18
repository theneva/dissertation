### Motivation for a case study

@yin:2014 suggests three classes of case study: _exploratory_, used to seek questions that require researching; _descriptive_, helpful in analysing a phenomenon in its natural context; and _explanatory_, seeking to both identify events and explain _why_ they occurred.

The work of establishing a set of characteristics that are important in a Automated Continuous Delivery (ACD) strategy is largely a _descriptive_ study, although it bears some _exploratory_ characteristics: the study might reveal connections to other, interesting areas, but the phenomenon under study is already largely defined. It is not of any particular interest to the research questions _why_ the organisation is in its current position.

### Selecting a case: FINN.no

FINN.no is Norway's leading actor in the online classified ads market, with several hundred thousand visitors unique visitors per week^[http://www.tnslistene.no/?list_id=1&week=16&year=2016&report=day&metric=historic]. FINN.no was an early adopter of the microservice pattern, and currently have more than 300 microservices. At the time of writing, they are currently in the process of migrating their entire platform to a uniform Deployment Strategy. This makes them an highly relevant case to study, and so two interviews were conducted to learn about what they, representing the industry as a whole, deem important in a Deployment Strategy. The following two of FINN's teams are of particular interest.

Team Cloud IO is responsible for maintaining and developing the infrastructure at FINN, and plays a large part in the initiative to migrate the entire organisation to containers. Team Cloud IO loosely defined the requirements for an organisation-wide uniform Deployment Automation strategy, and carries out the work of helping teams migrate their services to containers.

Team Reise was initially formed to rewrite the existing platform for the travel marketplace on FINN.no. As part of this process, the team focused on automating deployment as much as possible within the bounds set by the company's infrastructure. This resulted in Team Reise being the most automated platform, and thus the largest authority on experiences with Automated Deployment.


### Scoping the study to interviews

TODO: Why was the study scoped to only include interviews?

### Interview design

TODO: Describe how the interviews were carried out:

- Initial meeting with Team Cloud IO to find interesting teams and topics
- One on one, approximately one hour
- Semi-structured interviews [@oates:2006, pp.187--188]

### Limitations of the interview approach

TODO: Move this to the end of the discussion

Only a single company is represented in the interviews, and the number of informers is low. This makes it possible that the data is unreliable, but this risk will be mitigated for by the second step, where the interview data is tested in a realistic context. The data cannot, however, safely be generalised to fit any organisational size or structure. Indeed, FINN.no was chosen because they are ahead on technology choices in Norway, making them an exception rather than the standard.

The interviews also only provide a small sample of insights into the process and experiences. Therefore, the interview data may not be representative for the average team member, or even the average team. This is, however, not necessarily an issue: the team leaders' responsibility for their own teams requires them to be aware of the teams' efficiency.

The data could be made more generalisable by extending the case study to include surveying developers in other positions and teams, perhaps using a questionnaire based on the interview data [@oates:2006, p. 141]. The case study could also include other data generation methods, such as internal documents. This would, however, take much longer to complete, and is not critical to this initial attempt at defining a framework.

This research design avoids some important practical aspects of real-world software development: teamwork, coordination, and ever-changing priorities. Approaching the study with a variant of Action Research or Action Design Research [vaishnavi:2015], or Engaged Scholarship [ven:engaged-scholarship:2007] would have provided at least one set of thorough insights into a real case. Conversely, there are many potential pitfalls with this strategy: stepping into to a real-world system comes at the expense of sacrificing control over both the infrastructure and the priorities for the system. In a worst case scenario, this could lead to simply not being able to analyse any strategies.
