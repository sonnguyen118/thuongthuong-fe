import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { store } from '@store'
import viText from '@languages/vie.json'
import loadLanguageText from '@languages'
import axios from 'axios'
import { ListProducts } from '../home'
import Link from 'next/link'
import { Category } from '@components/model/Category'
import { SAN_PHAM } from 'src/constant/link-master'

const ListCategory = (props: any) => {
  const [t, setText] = useState(viText)
  const [categories, setCategories] = useState<Category[]>([])

  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  )

  useEffect(() => {
    setCategories(props.data)
  }, [props])
  const renderCategories = (arr: Category[]) => {
    const categoryElement: any[] = []
    arr.forEach(e => {
      categoryElement.push(
        <div className='list-products-left-item-ul' key={e.id}>
          <Link
            href={`${SAN_PHAM}${e.link}?language=${lang}`}
            className='home__products-header-btn-text'
          >
            {e.name}{' '}
          </Link>
        </div>
      )
      if (e.subCategories && e.subCategories.length > 0) {
        const paddingLeft = 0
        handleSubCate(e.subCategories, categoryElement, paddingLeft)
      }
    })
    return categoryElement
  }
  const handleSubCate = (
    arr: Category[],
    collector: any[],
    paddingLeft: number
  ) => {
    const cssPadding = paddingLeft + 30
    const subElementStyle = {
      paddingLeft: cssPadding // Giá trị padding-left 100px
    }
    arr.forEach(sub => {
      if (sub.subCategories && sub.subCategories.length > 0) {
        collector.push(
          <div
            className='list-products-left-item-li'
            style={subElementStyle}
            key={sub.id}
          >
            <Link
              href={`${SAN_PHAM}${sub.link}?language=${lang}`}
              className='home__products-header-btn-text'
            >
              {sub.name}{' '}
            </Link>
          </div>
        )
        handleSubCate(sub.subCategories, collector, cssPadding)
      } else
        collector.push(
          <div
            className='list-products-left-item-li'
            style={subElementStyle}
            key={sub.id}
          >
            <Link
              href={`${SAN_PHAM}${sub.link}?language=${lang}`}
              className='home__products-header-btn-text'
            >
              {sub.name}{' '}
            </Link>
          </div>
        )
    })
  }
  // useEffect(() => {
  //   loadLanguageText(lang, setText);
  //   getData();

  // }, [lang]);

  return (
    <div className='list-products-left'>
      <div className='list-products-left-title'>{t.list_products.TITLE}</div>
      <div className='list-products-left-wall'></div>
      {categories?.length > 0 ? (
        renderCategories(categories)
      ) : (
        <div>No categories found.</div>
      )}
    </div>
  )
}
export default ListCategory
