import factory
from faker import Faker
from django.utils.timezone import now
from .user__models import User
from .post__models import Post, Comment

fake = Faker()

class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    email = factory.Faker("safe_email")
    username = factory.Faker("user_name")

    @classmethod
    def _prepare(cls, create, **kwargs):
        password = kwargs.pop("password", None)
        user = super()._prepare(create, **kwargs)
        if password:
            user.set_password(password)
            if create:
                user.save()
        return user

class PostFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Post

    created_on = factory.LazyFunction(now) # LazyFunction é preferível para funções simples
    author = factory.SubFactory(UserFactory)
    status = 0

class CommentFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Comment

    body = factory.Faker('sentence', nb_words=10)
    post = factory.SubFactory(PostFactory)   
    author = factory.SubFactory(UserFactory) 