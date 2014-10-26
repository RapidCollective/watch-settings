#ifndef autoconfig_h
#define autoconfig_h

#include <pebble.h>

// {% for item in preferences['items']: %}
{{#each settingsList}}

  // {%- if item['type'] == 'enum' %}
  {{ #is type "enum"}}
  typedef enum {
    {{#each choices}}
      {{ uppercase cvarname name }}/*cvarname & upper*/_{{cvarname @key }}/*cvarname*/
    {{/each}}
    // {%- for key, choice in item['choices'].iteritems(): %}
    //   {{ item['name']|cvarname|upper }}_{{ key|cvarname }},
    // {%- endfor %}
  // } {{ item['name']|cvarname|capitalize }}Value;
  } {{capitalizeFirst cvarname name }} /* cvarname & capitalize */
  // {% endif %}
  {{ /is }}

  //this defines the mapping between dev friendly name and memory friendly ID
  #define {{uppercase cvarname name }}/*cvarname & upper */_PKEY {{ appKeysAccessor name }} /*json mapping of appKeys given a name */
  // #define {{ item['name']|cvarname|upper }}_PKEY {{ appKeys[item['name']] }}

  {{ #is type "enum" }}
  // {%- if item['type'] == 'enum' %}
    {{capitalizeFirst cvarname name }} /*cvarname & capitalize */Value get{{capitalizeFirst cvarname name}}/*cvarname & capitalize*/();
    //{{ item['name']|cvarname|capitalize }}Value get{{ item['name']|cvarname|capitalize }}();
  {{ /is }}

  {{ #is type "bool" }}

    // {%- elif item['type'] == 'boolean' %}
    // bool get{{ item['name']|cvarname|capitalize }}();
    bool get{{ capitalizeFirst cvarname name }} /* cvarname & capitalize */();
  {{ /is }}

  {{ #is type "string" }}
  // {%- elif item['type'] == 'string' %}
    // char* get{{ item['name']|cvarname|capitalize }}();
    char* get{{ capitalizeFirst cvarname name }} /* cvarname & capitalize */();
  {{ /is }}

  {{ #is type "int" }}
  // {%- else %}
    // int32_t get{{ item['name']|cvarname|capitalize }}();
    int32_t get{{ capitalizeFirst cvarname toInt name }} /* cvarname & capitalize */();
  // {%- endif %}
  {{ /is }}
// {% endfor %}
{{/each settingsList}}

void autoconfig_in_received_handler(DictionaryIterator *iter, void *context);

void autoconfig_init();

void autoconfig_deinit();

#endif
