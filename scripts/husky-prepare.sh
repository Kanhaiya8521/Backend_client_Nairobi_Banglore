#!/bin/bash

MAC_OS="darwin-amd64"
LINUX_OS="linux-amd64"
WINDOW_OS="windows-amd64"

ARCH=$(echo "$(uname -s|tr '[:upper:]' '[:lower:]'|sed 's/mingw64_nt.*/windows/')-$(uname -m |sed 's/x86_64/amd64/g')" |sed 's/darwin-arm64/darwin-amd64/g')

if [ "$ARCH" = "$WINDOW_OS" ];then
husky install && attrib +x ".husky/*"
else
husky install && chmod +x .husky/*
fi
