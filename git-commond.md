## Abort the merge
`git merge --abort`
## Discard your local one-word change
`git reset --hard HEAD`
## Verify clean state
`git status`
### Expected output:
`On branch Data_widget_In_Metric_Conf
nothing to commit, working tree clean`
## If you ALSO want to discard pulled changes (optional)
`git fetch origin
git reset --hard origin/Data_widget_In_Metric_Conf`
## Summary (1-liner)
`git merge --abort && git reset --hard HEAD
`
# save your current local changes into Git stash
`git stash save "data-graph-in-overlay"`
## Verify your stash
`git stash list`
## Output example:
`stash@{0}: On Data_widget_In_Metric_Conf: data-graph-in-overlay`
## Restore the stash later (when needed)
### Apply and keep stash
`git stash apply stash@{0}`
### Apply and remove stash
`git stash pop stash@{0}`
