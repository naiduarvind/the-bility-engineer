---
title: "Presentation: Serializing Culture by Kelsey Hightower"
date: 2020-06-24T07:30:44.608Z
thumb_img_path: /images/simplicity.png
excerpt: "Culture is what you do: the actions you take as you work; your steps
  in approaching problems."
template: post
---
> If you’re an executive, and you want to learn what is *likely happening inside your own company* today around your culture of software delivery (and the benefits you’d get by serializing that culture), this is a must-watch video.
>
> <div style="text-align:center"><a href="https://www.youtube.com/watch?v=d_lFZtlM5KI"><img src="https://img.youtube.com/vi/d_lFZtlM5KI/0.jpg" style="width:640px; height:480px" title="Kelsey Hightower on Spinnaker: Serializing Culture Into Continuous Delivery"></a></div>

I’m recommending this video because I haven’t seen a good one for a while that reflected how I typically approach understanding an organization within 90 days being in management, and Kelsey presented it in a clear and concise manner.

If you are new to the concept or would like a refresher, here are a few things to take note of:

* `practice > "best practice"`
* `serializing decisions`
* `practical, incremental steps of change`
* `same "front door" for internal users (cross-departments)`

By keeping in mind the takeaways above while serializing culture, one can easily and quickly acquire the techniques for getting people comfortable with new tools and automation!

A few quotes from [Kelsey Hightower](https://twitter.com/kelseyhightower) that completely resonated with my previous approaches on serializing culture for organizations I have worked for are:

* Give them a tarball, not a container!
* Add an egg, they want to make the cake!
* Tell a story, everyone loves a story.
* Where is the ticket? It's the front door.
* Get the front door right!

I have found repeated success in serializing culture to drive process improvements at work, [](https://support.atlassian.com/jira-software-cloud/docs/view-and-understand-the-control-chart/)through <strike>Spinnaker</strike> any tool that already exists within the realm of the organization. Charity Majors also incidentally happens to mention something similar:

![](/images/screenshot-2020-08-18-at-3.11.08-am.png "Use your tools and processes to improve your tools and processes. - Charity Majors")

But if a certain tool neither exists or works as intended, one should drive the adoption of a new tool that satisfies the previous and current requirements to minimize chaos presented in change -- as claimed by [Satir's Change Model](http://dhemery.com/articles/managing_yourself_through_change/).

While there’s a lack of homogeneity in the data which represents our culture, it is still helpful to understand the software development lifecycle (SDLC) process or the performance of a service desk. 

One way I have recently discovered on not only exploring the current SDLC process in place but rather every aspect affected by the organization's structure is through an [exploratory mindmap](https://www.kartar.net/2020/07/vpe-and-cto-the-first-90-days/) by [James Turnbull](https://twitter.com/kartar) which has made its way into my management tool belt.

![](/images/exploring-roadmap.svg "90-day Exploratory Mindmap by James Turnbull")

A personal journey of mine on serializing culture was similar to what was presented by Kelsey but of course with some extensions. We leveraged Jira Automations and Spinnaker Jira Stage which achieves the same as the custom tool without additional maintenance overhead. 

Our ticket gobbler was a "machine-user" and we had many iterations on our "front door" to balance similarity and familiarity for our internal users. Including SLAs into tickets using Jira Automations was a huge win in preventing a flood of messages from users to operators questioning "When would this be done?" and having enabled Jira Stage in Spinnaker informed users that their tickets has been done when the pipeline completed successfully.

Under the hood, many of the automations that catered towards serializing the process that was part of our culture used Terraform as a first class citizen with Jsonnet being the template engine for it. Every request would then fire off a pipeline in Spinnaker with Hub to create pull requests (PR) using the templatized Terraform manifests which was checked for conventions on naming, syntax, etc using Open Policy Agent against codified policies and PRs are merged automatically when the operator comments “Approved” in Jira Service Desk and the policy checks are green!

Here the fully automated “front door” using Jira Service Desk:

![](/images/screenshot-2020-08-19-at-2.00.10-pm.png "Serialized JSD")

If you have serialized a culture effectively and improved the processes / tools surrounding it cultivating change whilst keeping the abstracted "front door" the same -- maintaining / reducing overhead, reach out to me via the [contact](https://thebility.engineer/contact/) form and tell me your story over a meal or coffee.