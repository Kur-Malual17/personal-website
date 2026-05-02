from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Skill
from .serializers import SkillSerializer


class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    
    @action(detail=False, methods=['get'])
    def by_category(self, request):
        categories = {}
        for skill in self.queryset:
            if skill.category not in categories:
                categories[skill.category] = []
            categories[skill.category].append(SkillSerializer(skill).data)
        return Response(categories)
