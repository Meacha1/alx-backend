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


def get_user():
    '''Get user'''
    try:
        login_as = request.args.get('login_as')
        return users[int(login_as)]
    except Exception:
        return None


@app.before_request
def before_request():
    '''Before request'''
    user = get_user()
    g.user = user


@babel.localeselector
def get_locale():
    '''Get locale'''
    locale = request.args.get('locale')
    if locale and locale in app.config['LANGUAGES']:
        return locale
    if g.user and g.user['locale'] in app.config['LANGUAGES']:
        return g.user['locale']
    headers = request.headers.get('Accept-Language')
    if headers and headers.split(',')[0] in app.config['LANGUAGES']:
        return headers.split(',')[0]
    return request.accept_languages.best_match(app.config['LANGUAGES'])



@app.route('/')
def hello_world():
    '''Hello world'''
    return render_template('5-index.html')


if __name__ == '__main__':
    app.run(debug=True)
