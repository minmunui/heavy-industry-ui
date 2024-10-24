<script>
import ReactSortIcon from '@/views/fileList/ReactSortIcon.vue'
import SettingIcon from '@/components/icons/SettingIcon.vue'

export default {
  i18n: {
    ko: {
      Search: '검색하기',
    },
    cn: {
      Search: '搜索',
    }
  },
  components: { SettingIcon, ReactSortIcon },
  name: 'file-list-header',
  props: {
    changeSorting: {
      type: Function,
      default() {
        console.log('change sorting')
      }
    },
    sorting: {
      type: Object,
      default() {
        return { name: -1, time: -1 }
      }
    },
    name: String,
    startTime: String,
    endTime: String
  },
  methods: {
    changeTimeSorting() {
      this.$props.changeSorting('name')
    },
    changeNameSorting() {
      this.$props.changeSorting('time')
    }
  }
}
</script>

<template>
  <thead>
  <tr class="data-list__column-name">
    <th class="sticky">
      {{ $t('Index') }}
    </th>
    <th class="data-name">
      <div class="header-cell">
        {{ $t('Data name') }}
        <button class="outline secondary sorting" @click="this.changeTimeSorting">
          <react-sort-icon :sorting="this.sorting.name" />
        </button>
      </div>
    </th>
    <th class="data-size">
      {{ $t('Size') }}
    </th>
    <th class="data-date">
      <div class="header-cell">
        {{ $t('Date') }}
        <button class="outline secondary sorting" @click="this.changeNameSorting">
          <react-sort-icon :sorting="this.sorting.time" />
        </button>
      </div>
    </th>
    <th class="status-1">
      {{ $t('Status 1') }}
    </th>
    <th class="status-2">
      {{ $t('Status 2') }}
    </th>
  </tr>
  <tr>
    <th class="sticky">
      <button class="filter" @click="this.$emit('filter')">
        {{ $t('Filter') }}
      </button>
    </th>
    <th>
      <input class="name-filter" type="search" name="search" id="search" aria-label="Search" :value="name"
             :placeholder="$t('Search')"
             @input="$emit('update:name',$event.target.value)">
    </th>
    <th>
    </th>
    <th class="date-filter">
      <input class="date-filter" type="datetime-local" name="date" id="date" aria-label="Datetime local"
             :value="startTime" @input="$emit('update:startDate', $event.target.value)"> ~
      <input class="date-filter" type="datetime-local" name="date" id="date" aria-label="Datetime local"
             :value="endTime" @input="$emit('update:endDate', $event.target.value)">
    </th>
    <th>
    </th>
    <th>
    </th>
  </tr>
  </thead>
</template>

<style scoped>
button.filter, button.sorting {
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--vt-c-text-dark-2);

  &:hover, &:focus {
    box-shadow: 0 0 0 1px var(--vt-c-text-dark-2);
  }
}

th {
  text-align: center;

  &.sticky {
    position: sticky;
    z-index: 100;
    left: 0;
  }
}

.header-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

input.date-filter {
  font-size: 0.8rem;
  padding: 0.2rem 0.4rem;
  height: auto;
  width: 45%;
  margin: 0;
}

div.date-filter {
  display: flex;
  justify-content: center;
  align-items: center;
}

input {
  border: 1px solid var(--color-text);
  border-radius: 0.25rem;
}

.name-filter {
  padding: 0.2rem 0.4rem;
  margin: 0;
  height: auto;
  font-size: 0.8rem;
}

button.sorting {
  padding: 0;
  border: 1px solid var(--vt-c-text-dark-2);
}
</style>
