---
title: "FinOps: Making The Invisible Visible - Costs"
date: 2018-05-26T11:34:05.399Z
thumb_img_path: /images/aws-budgets.jpeg
template: post
---
> **ServiceRocket (SR) Engineers are unable to make optimal decisions because they do not consider the true cost of services being used.**

It is easy to see a price tag, but it is difficult to take into account all of the factors that make up a product’s true cost.

How can hidden costs be made visible? With a bit of effort, true monetary costs of many services used primarily on Amazon Web Services (AWS) can be calculated and made visible.

## Cost Allocation Tags

AWS by default allows a tag to be assigned to an AWS resource, i.e EC2, RDS, etc. Tags can be used to organize resources, and cost allocation tags to track AWS costs on a detailed level.

AWS has two types of cost allocation tags, an *AWS generated tags* and *user-defined tags.*

![Activating Cost Allocation Tags in AWS](/images/aws-generated-tags.png "Activating Cost Allocation Tags in AWS")

AWS defines, creates, and applies AWS generated tag, and user-defined tags can be defined, created and applied by the user. Both types of tags must be activated before they can appear on a cost allocation report or to be used for budgets in the Cost Allocation Tags page under **Billing Management Console**.

SR Engineering has two platforms, Learndot and Apps which is comprised of many teams that develop different products utilising different environments. The image below illustrates the user-defined tags created and applied on AWS resources created by Engineering.

![User-defined Cost Allocation Tags for AWS Resources](/images/user-defined-tags.png "User-defined Cost Allocation Tags for AWS Resources")

All the teams in Learndot and Apps either use Terraform or Cloudformation with a Jenkins pipeline to provision their infrastructure and deploy their applications, thus implementing the user-defined tags above was fairly straightforward.

![Cost Allocation Tags Implementation with Terraform](/images/terraform-cost-allocation-tags.jpeg "Cost Allocation Tags Implementation with Terraform")

![Cost Allocation Tags Implementation with CloudFormation](/images/cloudformation-cost-allocation-tags.jpeg "Cost Allocation Tags Implementation with CloudFormation")

## Budget on AWS

![Budgets on AWS](/images/budgets-on-aws.jpeg "Budgets on AWS")

After having the teams implement cost allocation tags as one of the Ops Missions, [Yuen-Chi Lian](https://medium.com/u/c39f98f7fe46?source=post_page-----66f53c2b5a64----------------------) created some budgets with guesstimated limits for services such as EC2, RDS, CloudWatch, and CDN based on cost usage by Engineering *(quarterly)* as a whole and by Learndot and Apps *(monthly)*.

![Budget Implementations for ServiceRocket Engineering](/images/budget-implementations.png "Budget Implementations for ServiceRocket Engineering")

These budgets were implemented with notifications to the Engineering Operations (Ops) mailing group. Ops receives emails in regards to a service for a particular budget in AWS surpassing the limit set.

However, this did not provide the ability to visually understand if and when the budget needs to be realigned or if a service was costing way more than it was intended and requires attention. If needed to be done, it would require tremendous manual effort.

![AWS Budget Email Notifications for Actual & Forecasted Amount](/images/budget-notifications.jpeg "AWS Budget Email Notifications for Actual & Forecasted Amount")

## Dashboard on Datadog

![Datadog Dashboard for AWS Budgets (Dark Mode)](/images/datadog-dashboard-for-aws-budgets.jpeg "Datadog Dashboard for AWS Budgets (Dark Mode)")

Hence, the Datadog dashboard above was setup to display the budgets from AWS which provides better visibility on a monthly basis and over a longer period of time for each service and platform which otherwise could not have been done via the emails Ops received.

Additional continuous efforts include:

1. Operations to analyse AWS dashboards on a quarterly basis and set close to realistic budget limits on all the AWS services and account.
2. Team to setup similar dashboard for products under Learndot (e.g Moo, Hamburger, and etc) and Apps (e.g. SFJC, SafetyOfficer, and etc) thus taking on cost ownership.

![AWS Budget Datadog Dashboard for Moo Product under the Learndot Platform](/images/datadog-dashboard-for-moo.jpeg "AWS Budget Datadog Dashboard for Moo Product under the Learndot Platform")

![AWS Budget Datadag Dashboard for Hambuger Product under the Learndot Platform](/images/datadog-dashboard-for-hamburger.jpeg "AWS Budget Datadag Dashboard for Hambuger Product under the Learndot Platform")