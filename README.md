# Gongt365 (공트365) 🏋️ Proof-of-concept
A basic full-stack webapp for the proof-of-concept of 2022 NIA Open Database Hackathon qualifier, Gongt365

2022 한국지능정보사회진흥원 공공데이터 아이디어 해커톤 본선 진출작 '공트365' 의 개념증명을 위해 만든 기초적인 풀스택 웹앱입니다.

## Live Demo

https://gongt365-poc.up.railway.app

## Features 
- Display geolocation data of municipal outdoor fitness equipments available in public places(city parks, hills, etc.) as point-of-interest(POI) markers on the map
- Bulletin board for users to organize workout meetups and events
- Provide fitness equipment instruction videos, safety tips, and workout guides
- ~~Personalized POI filters~~ 

## Technology Stack 
### Frontend
HTML + CSS + JavaScript
- CSS framework: [Tailwind CSS](https://tailwindcss.com/)
- Template engine: [EJS (Embedded JavaScript templates)](https://ejs.co/)
- Interactive map rendering library: [Leaflet.js](https://leafletjs.com/)

### Backend
- Javascript runtime environment: [Node.js](https://nodejs.org/en/)
- Web application framework: [Express.js](https://expressjs.com/)

### Database
- Document-oriented database: [MongoDB](https://www.mongodb.com/)
- Database hosting provider: [MongoDB Atlas](https://www.mongodb.com/atlas/database)

## Database
### Data source
[대한민국 정부 공공데이터 포털](https://www.data.go.kr/) (South Korean Public Data Portal)
 - The official South Korean e-government database website
    
## Datasets
- For pilot run
    - File: `서울특별시 서대문구_야외운동기구 설치 현황.csv`

## Deployment
- Platform-as-a-Service: [Railway.app](https://railway.app/)

## UI/UX Information Architecture Blueprint
- Map 
    - Leaflet.js map with POI markers
    - POI list with information
- Workout 
    - List that shows different types of public fitness equipments and relevant information
        - Equipment description
        - Instruction video as Youtube link (open externally)
        - Expected calorie burn per set/session/hour
- Meetup 
    - Bulletin board
        - List of meetup events
        - Modal: Write a post to organize a meetup event
        - Modal: Read meetup event description and RSVP
- Profile 
    - User account
    - Personalization
        - My Neighborhood
            - Select a service district, either manually or by GNSS/network-based geolocation from the browser
            - Show the current district's weather information
        - Fitness Focus
            - POI filters that shows fitness equipments corresponds to preferred body parts only (e.g. abs, chest, arms)
        - Workout Diary
            - Calendar-based personal workout journal
        - Workout Scheduler
            - Notification and interval settings

## Development Roadmap Fulfillment
### Implementation 
- Features
    - Scheduled daily/weekly/monthly workout sessions and notification
        - Needs access to native notification and background service
            - Progressive Web App
            - Hybrid webapp (e.g. Webview wrapper)
    - Timer-based fitness assistance (repetition/set counter and beeper)
        - Use Notifications API
    - Workout diary
        - Calendar-based CRUD
    - Provide routing from current location to POIs
        - Barebone: Use Leaflet Routing Machine (https://www.liedman.net/leaflet-routing-machine)
        - Commercial-grade: Replace Leaflet.js with domestic Naver Map Directions API
- Architecture
    - Establish user account database 
    - Implement fully-fledged user authentication and management system
        - ✅ Essential user authentication procedure for meetup events CRUD has been implemented
- Security
    - Ensure CORS-compliance
    - Sanitize inputs and queries

### Refactoring
- Frontend
    - UI handlers
        - Current: If statement-based switches
        - Refactor: Array and iterator-based switches
            - Migrate to frontend frameworks such as React or Vue in the future
    - Leaflet.js rendering
        - ~~Current: Low performance when there are too many POI markers~~
        - ~~Refactor: Use Leaflet.js plugin that supports WebGL~~
            - ✅ [Complete] Using Leaflet.markercluster as a straightforward workaround
- Backend
    - Design
        - Current: Query handlers are inefficient, unconventional, and hacky
            - Major refactoring is needed
            - ✅ Refactoring is on the way

### Improvement
- Expand service scope by utilizing more datasets available
    - Current: Seodaemun district, Seoul, South Korea (pilot run)
    - Phase 1: Seoul
    - Phase 2: + Seoul-Gyeonggi-Incheon Metropolitan Area
    - Phase 3: + Gangwon province + Chungcheong province
    - Phase 4: Nationwide; Utilize all municipal datasets available        

