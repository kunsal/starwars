# Starwars API
A minimal Star Wars movie API for getting list of movies, characters and adding comment to movies. This leverages on the swapi API on https://swapi.co.
### Features
- Built with NodeJS/Express framework
- Supports SQL data storage
### Installation
- Clone the repository     
- Run  
``npm install``  
### Usage
URL: https://kunsal-starwars.herokuapp.com/

##### Get Movies  
Retrieve all movies
  
| uri | method |
|-----| ---------|
|``/api/movies/``| GET |
|     ||

Response:
```$xslt
{
    "status": "success",
    "body": {
        "message": "Successful",
        "response": [
            {
                "movie_id": "1",
                "title": "A New Hope",
                "opening_crawl": "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
                "release_date": "1977-05-25",
                "comments_count": 1
            },
            {
                "movie_id": "2",
                "title": "The Empire Strikes Back",
                "opening_crawl": "It is a dark time for the\r\nRebellion. Although the Death\r\nStar has been destroyed,\r\nImperial troops have driven the\r\nRebel forces from their hidden\r\nbase and pursued them across\r\nthe galaxy.\r\n\r\nEvading the dreaded Imperial\r\nStarfleet, a group of freedom\r\nfighters led by Luke Skywalker\r\nhas established a new secret\r\nbase on the remote ice world\r\nof Hoth.\r\n\r\nThe evil lord Darth Vader,\r\nobsessed with finding young\r\nSkywalker, has dispatched\r\nthousands of remote probes into\r\nthe far reaches of space....",
                "release_date": "1980-05-17",
                "comments_count": 0
            }
            ....
        ]
    }
```
  
##### Single Movie  
Retrieve a single movie from movies   
  
| uri | method | Parameter|
|-----| ---------| ------|
|``/api/movies/<movie_id>``| GET | ``<integer>`` movie_id|
|     | | |
Response:
```$xslt
{
    "status": "success",
    "body": {
        "message": "Successful",
        "response": 
            {
                "movie_id": "1",
                "title": "A New Hope",
                "opening_crawl": "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
                "release_date": "1977-05-25",
                "comments_count": 1
            },
        
        }
    }
```

##### Add Comment  
Add comment to a movie   
  
| uri | method | Parameters |
|-----| ---------|  -----|
|``/api/comments/``| POST | ``<integer>`` movie_id |
|     | | ``<string>`` comment|

Request:
```$xslt
{
    "movie_id": 6,
    "comment": "The dark knight is here in the milky ways"
}
```

Response:
```$xslt
{
    "status": "success",
    "body": {
        "message": "Comment added",
        "response": {
            "comment_id": 7
        }
    }
}
```

##### Movie Comments  
Retrieve comments for a single movie  
  
| uri | method | Parameter|
|-----| ---------| ------|
|``/api/movies/<movie_id>/comments``| GET | ``<integer>`` movie_id |
|     | | |

Response:
```$xslt
{
    "status": "success",
    "body": {
        "message": "Successful",
        "response": [
            {
                "movie_id": 6,
                "content": "The dark knight is here in the milky ways",
                "commenter_ip": "::ffff:127.0.0.1",
                "created_at": "2019-05-09T16:33:54.461Z"
            },
            {
                "movie_id": 6,
                "content": "The dark knight is here in the milky ways",
                "commenter_ip": "::ffff:127.0.0.1",
                "created_at": "2019-05-09T13:23:11.144Z"
            }
        ]
    }
}
```

##### Movie Characters
Retrieve characters for a single movie. This accepts query strings.
* <b>sort_by</b>: value can be any of ```'height', 'name', 'gender'```
* <b>sort_order</b>: value can be any of ```'asc', 'desc'```. Defaults to ``'asc'``
* <b>filter_by</b>: Filter by ```'male or female'```  
e.g ```/api/movies/2/characters?sort_by=gender&sort_order=desc&filter_by=female```
  
| uri | method | Parameter|
|-----| ---------| ------|
|``/api/movies/<movie_id>/characters``| GET | ``<integer>`` movie_id |
|     | | |

Response:
```$xslt
{
    "status": "success",
    "body": {
        "message": "Successful",
        "response": {
            "total": 1,
            "characters": [
                {
                    "name": "Beru Whitesun lars",
                    "height": "165",
                    "mass": "75",
                    "hair_color": "brown",
                    "skin_color": "light",
                    "eye_color": "blue",
                    "birth_year": "47BBY",
                    "gender": "female",
                    "homeworld": "https://swapi.co/api/planets/1/",
                    "films": [
                        "https://swapi.co/api/films/5/",
                        "https://swapi.co/api/films/6/",
                        "https://swapi.co/api/films/1/"
                    ],
                    "species": [
                        "https://swapi.co/api/species/1/"
                    ],
                    "vehicles": [],
                    "starships": [],
                    "created": "2014-12-10T15:53:41.121000Z",
                    "edited": "2014-12-20T21:17:50.319000Z",
                    "url": "https://swapi.co/api/people/7/",
                    "height_in_ft": "5ft5in"
                }
            ]
        }
    }
}
```

### License
ISC

 
