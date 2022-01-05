#!/bin/bash
set -e

yarn set version berry
yarn install --immutable
yarn build

