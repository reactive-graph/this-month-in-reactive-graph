---
name: Monthly Issue
about: Create a new issue every month.
title: "Monthly Issue: {{ date | date('MMMM YYYY') }}"
labels:
  - "Monthly Issue"
---
# Monthly Issue {{ date | date('MMMM YYYY') }}

- [ ] Create a new branch for the {{ date | date('MMMM YYYY') }} issue of `This Month in Reactive Graph`
- [ ] Link the {{ date | date('MMMM YYYY') }} issue of `This Month in Reactive Graph` in `SUMMARY.md`
- [ ] Merge Pull Request
- [ ] Post a link to the {{ date | date('MMMM YYYY') }} issue of `This Month in Reactive Graph` on [Mastodon](https://floss.social/@reactive_graph)
- [ ] Post a link to the {{ date | date('MMMM YYYY') }} issue of `This Month in Reactive Graph` on [Facebook](https://www.facebook.com/reactive.graph)
