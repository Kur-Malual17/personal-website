from rest_framework import serializers
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    profile_image = serializers.SerializerMethodField()
    about_image = serializers.SerializerMethodField()
    journey_image = serializers.SerializerMethodField()
    
    class Meta:
        model = Profile
        fields = '__all__'
    
    def get_profile_image(self, obj):
        if obj.profile_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.profile_image.url)
            return obj.profile_image.url
        return None
    
    def get_about_image(self, obj):
        if obj.about_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.about_image.url)
            return obj.about_image.url
        return None
    
    def get_journey_image(self, obj):
        if obj.journey_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.journey_image.url)
            return obj.journey_image.url
        return None
