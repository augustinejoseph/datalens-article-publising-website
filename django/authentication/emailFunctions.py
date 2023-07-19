import secrets

def generate_verification_token(user):
    # Generate a random token
    token = secrets.token_urlsafe(32)

    # Save the token in the user's model
    user.verification_token = token
    user.save()

    return token
