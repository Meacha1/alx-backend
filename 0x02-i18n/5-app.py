#!/usr/bin/env python3
'''Basic flask app, with a single route and template'''
from flask import Flask, render_template, request, g
from flask_babel import Babel
from flask import request


class Config(object):
    '''Config class'''
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app = Flask(__name__)
app.config.from_object(Config)
app.url_map.strict_slashes = False
babel = Babel(app)
users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


@app.before_request
def before_request():
    '''Before request'''
    user_id = request.args.get('login_as')
    if user_id:
        user = users.get(int(user_id))
        if user:
            g.user = user


@babel.localeselector
def get_locale():
    '''Get locale'''
    queries = request.query_string.decode('utf-8').split('&')
    for query in queries:
        if 'locale=' in query:
            return query.split('=')[1]

    # if locale not in app.config['LANGUAGES']:
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def hello_world():
    '''Hello world'''
    return render_template('4-index.html')


if __name__ == '__main__':
    app.run(debug=True)
