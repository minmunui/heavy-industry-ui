<script>
import ReactSortIcon from '@/views/fileList/ReactSortIcon.vue'

export default {
  components: { ReactSortIcon },
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
      default: {
        name: -1,
        date: -1
      }
    }
  },
  methods: {
    changeDateSorting() {
      this.$props.changeSorting('name')
    },
    changeNameSorting() {
      this.$props.changeSorting('date')
    }
  }
}
</script>

<template>
  <thead>
  <tr class="data-list__column-name">
    <th>
      {{ $t('Index') }}
    </th>
    <th class="data-name">
      <div class="header-cell">
        {{ $t('Data name') }}
        <button class="outline secondary sorting" @click="this.changeDateSorting">
         <react-sort-icon :sorting="this.sorting.name"/>
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
          <react-sort-icon :sorting="this.sorting.date"/>
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
    <th>
      {{ $t('Filter') }}
    </th>
    <th>
      <input class="name-filter" type="search" name="search" id="search" aria-label="Search">
    </th>
    <th>
    </th>
    <th class="date-filter">
      <input class="date-filter" type="datetime-local" name="date" id="date" aria-label="Datetime local"> ~
      <input class="date-filter" type="datetime-local" name="date" id="date" aria-label="Datetime local">
    </th>
    <th>

    </th>

    <th>

    </th>
  </tr>
  </thead>
</template>

<style scoped>

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

.name-filter {
  padding: 0.2rem 0.4rem;
  margin: 0;
  height: auto;
  font-size: 0.8rem;
}

button.sorting {
  padding: 0.25rem;
}
</style>
