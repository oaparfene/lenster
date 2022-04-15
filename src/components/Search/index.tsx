import { GridItemEight, GridItemFour, GridLayout } from '@components/GridLayout'
import Footer from '@components/Shared/Footer'
import SEO from '@components/utils/SEO'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import Custom404 from 'src/pages/404'

import Feed from './Feed'

const Search: NextPage = () => {
  const { query } = useRouter()

  if (!query.q || !['pubs', 'users'].includes(query.type as any))
    return <Custom404 />

  return (
    <>
      <SEO />
      <GridLayout>
        <GridItemFour>
          <Footer />
        </GridItemFour>
        <GridItemEight className="space-y-5">
          {query.type === 'pubs' && <Feed />}
        </GridItemEight>
      </GridLayout>
    </>
  )
}

export default Search
