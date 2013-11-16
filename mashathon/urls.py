from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

from mashmaker import views

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'mashathon.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^home/', 'mashmaker.views.home'),
    url(r'^player/', 'mashmaker.views.player')
)
