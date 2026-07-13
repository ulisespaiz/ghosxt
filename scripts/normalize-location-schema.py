#!/usr/bin/env python3
"""Replace page-specific LocalBusiness schema on location landing pages.

Ghosxt has one real business entity at https://ghosxt.com/#business. City,
county, and local-service pages should describe a WebPage and Service whose
provider points to that entity instead of pretending each page is a staffed
office.
"""

from __future__ import annotations

import html
import json
import re
from copy import deepcopy
from pathlib import Path
from typing import Any
from urllib.parse import urlsplit, urlunsplit

ROOT =