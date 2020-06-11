export const resultForJsonFormatter = `{
  "common": [
    {
      "setting1": {
        "value": "Value 1",
        "type": "unchanged"
      },
      "setting2": {
        "value": 200,
        "type": "deleted"
      },
      "setting3": {
        "value": true,
        "type": "modified"
      },
      "setting6": [
        {
          "key": {
            "value": "value",
            "type": "unchanged"
          },
          "ops": {
            "value": "vops",
            "type": "added"
          }
        }
      ],
      "follow": {
        "value": false,
        "type": "added"
      },
      "setting4": {
        "value": "blah blah",
        "type": "added"
      },
      "setting5": {
        "value": {
          "key5": "value5"
        },
        "type": "added"
      }
    }
  ],
  "group1": [
    {
      "baz": {
        "value": "bas",
        "type": "modified"
      },
      "foo": {
        "value": "bar",
        "type": "unchanged"
      },
      "nest": {
        "value": {
          "key": "value"
        },
        "type": "modified"
      }
    }
  ],
  "group2": {
    "value": {
      "abc": 12345
    },
    "type": "deleted"
  },
  "group3": {
    "value": {
      "fee": 100500
    },
    "type": "added"
  }
}`;
export const resultForPlainFormatter = "Property 'common.setting2' was deleted\nProperty 'common.setting3' was changed from 'true' to [complex value]\nProperty 'common.setting6.ops' was added with value: vops\nProperty 'common.follow' was added with value: false\nProperty 'common.setting4' was added with value: blah blah\nProperty 'common.setting5' was added with value: [complex value]\nProperty 'group1.baz' was changed from 'bas' to 'bars'\nProperty 'group1.nest' was changed from [complex value] to 'str'\nProperty 'group2' was deleted\nProperty 'group3' was added with value: [complex value]";
export const resultForStylishFormatter = `{
    common: {
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
        setting6: {
            key: value
          + ops: vops
        }
      + follow: false
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }      
      + nest: str
    }
  - group2: {
      abc: 12345
    }
  + group3: {
        fee: 100500
    }
}`;
