#!/bin/sh

# Get the current branch name
BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)

# Define the regex pattern for a valid branch name
PATTERN="^(feature|bug|release)/[0-9]+-[a-z]+(?:_[a-z]+){0,3}$"

if ! echo "$BRANCH_NAME" | grep -Eq "$PATTERN"; then
  echo "Error: Invalid branch name '$BRANCH_NAME'."
  echo "Branch name must follow the pattern: $PATTERN"
  exit 1
fi
