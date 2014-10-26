#include <pebble.h>
#include "autoconfig.h"

{% set persitantDataSize = 0 %}
{% if 'items' in preferences %}
{% for item in preferences['items'] -%}
{% if item['type'] == 'boolean' %}
bool _{{ item['name']|cvarname }};
bool get{{ item['name']|cvarname| capitalize }}(){return _{{ item['name']|cvarname }};}
void set{{ item['name']|cvarname | capitalize }}(bool value){_{{ item['name']|cvarname }} = value;}
{% set persitantDataSize = persitantDataSize + 4 + 2 %}
{% elif item['type'] == 'enum' %}
{{ item['name']|cvarname|capitalize }}Value _{{ item['name']|cvarname }};
{{ item['name']|cvarname|capitalize }}Value get{{ item['name']|cvarname| capitalize }}(){return _{{ item['name']|cvarname }};}
void set{{ item['name']|cvarname | capitalize }}({{ item['name']|cvarname|capitalize }}Value value){_{{ item['name']|cvarname }} = value;}
{% set persitantDataSize = persitantDataSize + 4 + 4 %}
{% elif item['type'] == 'string' %}
char _{{ item['name']|cvarname }}[{{item['max-length']}}];
{%- if (item['max-length']|int) > (124 - 1 - 7) %}
// Generated error for string size overflow
#error : The length of strings cannot exceed {{ 124 - 1 - 7}} bytes but your string '{{item['name']}}' is {{ item['max-length'] }} bytes long
{% endif -%}
char* get{{ item['name']|cvarname| capitalize }}(){return _{{ item['name']|cvarname }};}
void set{{ item['name']|cvarname | capitalize }}(char* value){strncpy(_{{ item['name']|cvarname }}, value, {{ item['max-length'] }});}
{% set persitantDataSize = persitantDataSize + 4 + 1 * (item['max-length']|int) %}
{% else %}
int32_t _{{ item['name']|cvarname }};
int32_t get{{ item['name']|cvarname| capitalize }}(){return _{{ item['name']|cvarname }};}
void set{{ item['name']|cvarname | capitalize}}(int32_t value){_{{ item['name']|cvarname }} = value;}
{% set persitantDataSize = persitantDataSize + 4 + 4 %}
{% endif -%}
{%- if persitantDataSize > 4000 %}
// Generated error for persistant data size overflow
#error : The size of all persisted values cannot exceed 4KB but your parameters require {{ persitantDataSize }}B
{% endif -%}
{% endfor %}
{% endif -%}

void autoconfig_in_received_handler(DictionaryIterator *iter, void *context) {
  Tuple *tuple = NULL;
  {% if 'items' in preferences %}
  {% for item in preferences['items']: -%}
  tuple = dict_find(iter, {{ item['name']|cvarname|upper }}_PKEY);
  {%- if item['type'] == 'string' %}
  tuple ? set{{ item['name']|cvarname | capitalize }}(tuple->value->cstring) : false;
  {%- else %}
  tuple ? set{{ item['name']|cvarname | capitalize }}(tuple->value->int32) : false;
  {%- endif %}
  {% endfor %}
  {%- endif %}
}

void autoconfig_init(){
  app_message_register_inbox_received(autoconfig_in_received_handler);
  app_message_open(app_message_inbox_size_maximum(), app_message_outbox_size_maximum());

  {% if 'items' in preferences %}
  {% for item in preferences['items']: -%}
  if (persist_exists({{ item['name']|cvarname|upper }}_PKEY)) {
    {%- if item['type'] == 'string' %}
    persist_read_string({{ item['name']|cvarname|upper }}_PKEY, _{{ item['name']|cvarname }}, {{item['max-length'] + 1}});
    set{{ item['name']|cvarname | capitalize }}(_{{ item['name']|cvarname }});
    {%- elif item['type'] == 'boolean' %}
    set{{ item['name']|cvarname | capitalize }}(persist_read_bool({{ item['name']|cvarname|upper }}_PKEY));
    {%- else %}
    set{{ item['name']|cvarname | capitalize }}(persist_read_int({{ item['name']|cvarname|upper }}_PKEY));
    {%- endif %}
  }
  {%- if item['default'] is defined %}
  else {
    {%- if item['type'] == 'string' %}
    set{{ item['name']|cvarname | capitalize }}("{{item['default']}}");
    {%- else %}
    set{{ item['name']|cvarname | capitalize }}({{item['default']|lower}});
    {%- endif %}
  }
  {%- endif %}

  {% endfor %}
  {%- endif %}
}

void autoconfig_deinit(){
  {% if 'items' in preferences %}
  {%- for item in preferences['items']: -%}
  {%- if item['type'] == 'string' %}
  persist_write_string({{ item['name']|cvarname|upper }}_PKEY, _{{ item['name']|cvarname }});
  {%- elif item['type'] == 'boolean' %}
  persist_write_bool({{ item['name']|cvarname|upper }}_PKEY, _{{ item['name']|cvarname }});
  {%- else %}
  persist_write_int({{ item['name']|cvarname|upper }}_PKEY, _{{ item['name']|cvarname }});
  {%- endif %}
  {%- endfor %}
  {%- endif %}
}
