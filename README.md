# Single Subject Graphs .com

Single-subject research is a group of research methods that are used extensively in the experimental analysis of behavior and applied behavior analysis with both human and non-human participants. This research strategy focuses on one participant and tracks their progress in the research topic over a period of time. Single-subject research allows researchers to track changes in an individual over a large stretch of time instead of observing different people at different stages. This type of research can provide critical data in several fields, specifically psychology. It is most commonly used in experimental and applied analysis of behaviors. Principal methods in this type of research are: A-B-A-B designs, Multi-element designs, Multiple Baseline designs, Repeated acquisition designs, Brief experimental designs and Combined designs.

These methods form the heart of the data collection and analytic code of behavior analysis. Behavior analysis is data driven, inductive, and disinclined to hypothetico-deductive methods.

## Why I Built this site

One day while my girlfriend was working on her schoolwork, she needed to create these graphs. She complained that they took long to create, and there was no option but to create it manually. I thought, "Hmm, I think I could build that....". Currently to create these graphs, you need to manually build them with a program like excel, or using a language like R. 

Over a few days, I built this graph generator to help individuals quickly and easily create formatted graphs, saving them valuable time. 

## Features
1. Create Reverse Baseline graphs from data sheet
2. Create Multiple Baseline Graphs from data sheet
3. Download generated graph as PNG image. 

## Usage

visit [singlesubjectgraphs.com](https://singlesubjectgraphs.com) to see the deployed site. 

### Running Locally

1. clone this repo to your local machine using `git clone https://github.com/TimWallaceDev/single-subject-graphs`
2. Change into that directory using `cd single-subject-graphs`
3. Install packages using `npm install`
4. Run the dev server using `npm run dev`
5. Navigate to localhost:5173 to view the site 


## Technology Used

- React
- Typescript
- Plotly
- Papaparse
