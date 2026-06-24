# LifeOS - Personal Optimization Engine

## Overview

LifeOS is an AI-powered personal experimentation platform that helps users discover what habits, routines, and lifestyle choices work best for them.

Unlike traditional habit trackers that only track streaks, LifeOS treats habits as experiments and generates personalized insights based on user data.

## Problem Statement

People follow generic productivity and wellness advice without knowing whether it actually works for them. Current habit-tracking apps focus on consistency but fail to answer:

**"Does this habit improve my life?"**

## Solution

LifeOS allows users to:

* Create personal experiments
* Define hypotheses
* Track daily metrics
* Compare outcomes
* Receive AI-generated insights
* Build a personalized life profile

## Features

### Experiment Creation

Create experiments such as:

* Morning vs Night Study
* No Social Media Challenge
* 6 Hours vs 8 Hours Sleep
* Daily Exercise Challenge

### Daily Logging

Track:

* Mood
* Energy
* Productivity
* Sleep
* Screen Time
* Exercise

### AI Analysis

Analyze experiment outcomes and identify patterns.

### Personalized Recommendations

Suggest habits and routines based on previous experiment results.

### Personal Operating Manual

Generate a customized profile containing:

* Ideal sleep schedule
* Best study hours
* Most productive work period
* Recommended exercise timing

## AI Configuration

LifeOS supports both local and online AI models. By default, it uses **Ollama** for local inference to ensure privacy and zero costs.

### Local AI (Ollama) - Recommended
1. Install [Ollama](https://ollama.com/).
2. Pull your preferred model (e.g., `ollama pull llama3`).
3. Set `AI_PROVIDER=ollama` in your `.env`.

### Online AI (BYOK) - Optional
1. Set `AI_PROVIDER=openai` in your `.env`.
2. Add your `OPENAI_API_KEY`.

## Technology Stack

Frontend:

* React.js
* Tailwind CSS

Backend:

* Node.js
* Express.js

Database:

* MongoDB

AI:
*   Local AI Inference (Ollama) - **Mandatory/Default**
*   OpenAI API (Optional - Bring Your Own Token)


## Target Users

* Students
* Professionals
* Productivity Enthusiasts
* Fitness Enthusiasts
* Self-Improvement Communities

## Future Scope

* Smartwatch Integration
* Automatic Experiment Suggestions
* Community Challenges
* AI Life Coach
* Advanced Analytics Dashboard

## Expected Impact

LifeOS empowers users to make evidence-based decisions about their lifestyle, productivity, and well-being through structured self-experimentation.
