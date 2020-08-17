---
title: "Leadership: First Quarter as an SRE"
subtitle: ""
date: 2019-01-07T11:38:17.577Z
thumb_img_path: /images/sre-jd.png
excerpt: Efforts to transition a traditional Ops team to an elite SRE team.
template: post
---
Ever since the Site Reliability Engineering (SRE) book was published in 2016, we have been improving our approach to operations by gradually adopting some tools mentioned in the book, e.g. defining Service Level Objectives (SLO), learning and preventing failures from incident reports, etc. Our selective adoption has met with limited success, mainly due to how an Operations Engineer was still being perceived as a firefighter. Before we were renamed to Operations Engineers, we were once called System Operators (SysOps).

Three months ago, we made the decision to commit holistically to the SRE [philosophy and principles](https://landing.google.com/sre/sre-book/chapters/part2/), by first unplugging our Operations Engineers from product engineering squads to form our first ever SRE squad. I was tasked to spearhead this initiative, along with my team member [Jayaseelan](https://medium.com/u/cd43a6aa4531?source=post_page-----11117866a64e----------------------).

The first thing was to revamp our job description by the JD framework in Engineering, which takes inspiration from[ Linda Galindo’s work on accountability](https://www.amazon.com/Accountability-Experience-Poster-Linda-Galindo/dp/0470604786). A JD contains a brief introduction, measures of success, a set of responsibilities and accountabilities, along with principles to on-call duty, on-boarding processes, team mobility, etc.

![](/images/sre-jd.png "Snippet of the Site Reliability Engineering job description.")

The next thing we did defined our 3 -month journey, which was to construct the Objective Key Results ([OKR](https://rework.withgoogle.com/guides/set-goals-with-okrs/steps/introduction/)) for the quarter and set to work. OKR

Now that three months have passed, I am writing this to share my reflections and future plans for our SRE team.

## A Rookie Leading

I was on pins and needles when I was asked to re-build the JD for the role and hiring resources such as pre-screening and interview questions.

* The leaders I work with have great technical and leadership skills, while I had very little to no experience.
* My teammates were all more experienced in their respective domains than I was (they still are and I am continuously learning from them).

I am still by no means a leader by title or skills but so far it has turned out to work especially well.

## OKR

We set a simple yet clear objective to begin with: form an SRE squad. I am very happy with the results of our work, done by just two people (and [we are hiring for the third member](https://www.linkedin.com/jobs/view/1029669368/)!). There are more challenges ahead and imagining that makes me excited.

**1st Key Result:** stabilise our platform in both private and public clouds. We started removing and improving components to reduce outages. While it is impossible to hit zero outages, our effort amounted to improve *signal to noise ratio* that had a significant reduction in downtime which directly resulted in increased engineer happiness.

* We removed all `Puppet` modules which were baked into the container that was a direct result of creating a container image from a VM.
* We moved away from an unstable version of `supervisor` to `svscan` for monitoring and controlling our processes.
* We instrumented and profiled our application thoroughly which helped us correctly tune our `JVM` instances to near perfection.
* We upgraded `Tomcat` from v7 to v9 and are thoroughly testing for an optimum tune, resulting in higher throughput and a fail-fast Tomcat (meow!).
* We removed `httpd` from the container to give room for other processes and replaced `AJP` connector in Tomcat with `NIO` protocol.

Some efforts above might seem small and straightforward but it was a direct consequence of the SRE squad formation. This relieved both of us from the constant pressure of tackling outages at wee hours with immediate remedies and product request but instead focus on long term solutions.

> Can you imagine the immense level of joy seeing all 12 **Puppet** modules and a supervisor being removed from the container image which causes our application to restart at random time of the day in a week?

**2nd Key Result:** increase reliability of our platform through benchmarking. The work requires us to identify the availability of crucial components in the user execution flow.

* Define and establish *SLA* & *SLO* for trace components of the flow.
* Monitor and measure performance of the newly defined *SLA* & *SLO*.

This key result is still ongoing and it involves collaboration with our Product team in Santiago (Chile) and a good understanding of our end-user behaviours.

## **Near Future**

We are currently exploring on-the-fly garbage collection (GC) analysis, collecting metrics on CPU & memory profiles via [perf](https://perf.wiki.kernel.org/index.php/Main_Page) and[ Flame Graphs](http://www.brendangregg.com/FlameGraphs/cpuflamegraphs.html), and also benchmarking our application with different JVMs (e.g. [GraalVM](https://www.graalvm.org/) and [Zulu](https://www.azul.com/)). We are also exploring the adoption of a unique APM tool along with implementing OpenTracing to go with it.

In this quarter, we are looking to [hire new team mate](https://www.linkedin.com/jobs/view/1029669368/), to help building our vision of great operations, tooling, and culture.

## Personal Musing

I have been musing on these 2 metaphors, and tinkering on the idea to broaden their adoption in our team:

**Argument by mapping.**To arrive to the best decision in a discussion, I would like us to see arguments as proofs (as is common among the mathematicians), or even better, prove arguments with [mapping](https://medium.com/wardleymaps). Driving discussion with this degree of rational would harness better decisions with bigger impact and greater value for the business.

![Mapping on developer visibility of the platform and its components against its evolution.](/images/wardley-mapping.jpeg "Mapping on developer visibility of the platform and its components against its evolution.")

\
**Time is money.** With the new squad making headway for the SysOps engineers to be in SRE, most operational related tasks are now owned by product engineers instead. This provides us with ample time that otherwise would have been taken up to solve outages and write incident reports. As a result, the number of infrastructure-related outages has been significantly reduced, which in return gives back more time now for engineers to focus on what matters for the business.

If you would like to share how you run an SRE team effectively, or to implement OKR with a shared vision, please let me a comment here, or we could meet up over coffee to learn from each other.