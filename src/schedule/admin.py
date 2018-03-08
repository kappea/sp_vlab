from __future__ import unicode_literals
from django import forms
from django.contrib import admin
from django_summernote.widgets import SummernoteWidget

from .models import Schedule, Day, Room, SlotKind, Slot, SlotRoom, Presentation, Session, SessionRole


class DayInline(admin.StackedInline):
    model = Day
    extra = 2


class SlotKindInline(admin.StackedInline):
    model = SlotKind


class ScheduleAdmin(admin.ModelAdmin):
    model = Schedule
    inlines = [DayInline, SlotKindInline, ]


class SlotRoomInline(admin.TabularInline):
    model = SlotRoom
    extra = 1


# Apply summernote to 'content_override' TextField in Slot.
class SlotAdminForm(forms.ModelForm):
    class Meta:
        model = Slot
        #widgets = {
        #  'content_override': SummernoteWidget(),
        #}
        fields = '__all__'

class SlotAdmin(admin.ModelAdmin):
    form = SlotAdminForm
    list_filter = ("day", "kind")
    list_display = ("day", "start", "end", "kind", "content_override")
    inlines = [SlotRoomInline]


class RoomAdmin(admin.ModelAdmin):
    list_display = ["name", "order", "schedule"]
    list_filter = ["schedule"]
    inlines = [SlotRoomInline]


# Apply summernote to 'description' and 'abstract' TextFields in Presentation.
class PresentationAdminForm(forms.ModelForm):
    class Meta:
        model = Presentation
        widgets = {
          'description': SummernoteWidget(),
          'abstract': SummernoteWidget(),
        }
        fields = '__all__'

class PresentationAdmin(admin.ModelAdmin):
    form = PresentationAdminForm
    list_filter = ("section", "cancelled", "slot")


admin.site.register(Day)
admin.site.register(
    SlotKind,
    list_display=["label", "schedule"],
)
admin.site.register(
    SlotRoom,
    list_display=["slot", "room"]
)
admin.site.register(Schedule, ScheduleAdmin)
admin.site.register(Room, RoomAdmin)
admin.site.register(Slot, SlotAdmin)
admin.site.register(Session)
admin.site.register(SessionRole)
admin.site.register(Presentation, PresentationAdmin)
