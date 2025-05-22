type renderKey = 'default' | 'array' | 'number'

interface eColumnType<RecordType> extends ColumnType<RecordType> {
  type?: renderKey
}

type eColumnsType<RecordType=unknown> = (ColumnGroupType<RecordType> | eColumnType<RecordType>)[]