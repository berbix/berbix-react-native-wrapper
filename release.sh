#!/bin/bash

set -ex

VERSION=$(cat version)

git tag -a $VERSION -m "Version $VERSION"
git push --follow-tags

npm publish