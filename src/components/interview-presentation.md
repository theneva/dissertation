### Motivation for a case study

@yin:2014 suggests three classes of case study: _exploratory_, used to seek questions that require researching; _descriptive_, helpful in analysing a phenomenon in its natural context; and _explanatory_, seeking to both identify events and explain _why_ they occurred.

The work of establishing a set of characteristics that are important in a Automated Continuous Delivery (ACD) strategy is largely a _descriptive_ study, although it bears some _exploratory_ characteristics: the study might reveal connections to other, interesting areas, but the phenomenon under study is already largely defined. It is not of any particular interest to the research questions _why_ the organisation is in its current position.

### Selecting a case: FINN.no

FINN.no is Norway's leading actor in the online classified ads market, with several hundred thousand unique visitors per week^[http://www.tnslistene.no/?list_id=1&week=16&year=2016&report=day&metric=historic]. FINN.no has adopted the microservice pattern, and currently has more than 300 microservices. At the time of writing, they are currently in the process of migrating their entire platform to a uniform Deployment Strategy. This makes them an highly relevant case to study. Two interviews were conducted to learn about what they, representing the industry as a whole, deem important in a Deployment Strategy. The following two of FINN.no's teams are of particular interest.

Team Cloud IO is responsible for maintaining and developing the infrastructure at FINN.no, and plays a large part in the initiative to migrate the entire organisation to containers. Team Cloud IO loosely defined the requirements for an organisation-wide Deployment strategy, and carries out the work of helping teams migrate their services to containers.

Team Reise (Travel) was initially formed to rewrite the existing platform for the travel marketplace on FINN.no. As part of this process, the team focused on automating deployment as much as possible within the bounds set by the company's infrastructure. This resulted in Team Reise's services being most automated on the FINN.no platform.

### Scoping the study to interviews

As described in the Introduction, part of the preparation for this project involved following and working for FINN.no for four months. Thus, an overview of how the day-to-day deployment and the issues that affect all developers was already established before the study began. However, this preparation was not a formal data collection process, and so a more controlled gathering of data relevant to the study is required.

Interviews were chosen as a way to expand a general understanding of development work at FINN.no to include extensive knowledge of the ideas and thoughts behind infrastructure and deployment. If another organisation had hosted the case study, a much more extensive look into their current processes and day-to-day development would have been required. This could have been accomplished by combining multiple data generation methods such as document analysis to establish a foundational understanding of the organisation and its processes [@oates:2006]. This understanding could then have been expanded by focused interviews, similar to the interviews carried out in this study.

### Interview design

The interviews at FINN.no were largely a _descriptive_ effort [@yin:2014], but the nature of the data collection was partly _exploratory_. The case study was initially planned through a meeting with the leader of the Cloud IO team, which is responsible for the infrastructure at FINN.no. This initial meeting revealed that FINN.no was at the time planning to migrate to a new deployment strategy. A need was established to conduct two semi-structured interviews [@oates:2006, pp. 187--188].

The first interview aimed to identify the needs of a development team, as well as learn about the team's experiences with automating the deployment process using the existing deployment pipeline. The interview guide can be found in appendix (TODO: reference to appendix).

TODO: write something more about how the interview was carried out

The second interview sought to identify the reasoning and evaluation process behind selecting a new deployment strategy, and which criteria were used to find the best suited deployment strategy for FINN.no. The interview guide can be found in appendix (TODO: reference to appendix).

TODO: write something more about how the interview was carried out

Both interviews were one on one at FINN.no's offices in Oslo, and each lasted approximately one hour.
