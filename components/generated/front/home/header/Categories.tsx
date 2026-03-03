import React from 'react';
import Link from 'next/link';

export default function Categories(props: any) {
  return (
    <>
<ul className="dropdown-menu" aria-labelledby="categoryMenu">
    {categories.map(category => (

        <li className="{category.subCategories|length > 0 ? 'dropdown-submenu dropend' : ''}">
            <a className="dropdown-item {category.subCategories|length > 0 ? 'dropdown-toggle' : ''}" href="{url("app_front_category_courses", {slug: category.slug})}">{category.name}</a>
            {category.subCategories|length > 0 && (

                <ul className="dropdown-menu dropdown-menu-start" data-bs-popper="none">
                    {% for subCategory in category.subCategories %}
                        <!-- dropdown submenu open right -->
                        <li className="{subCategory.subCategories|length > 0 ? 'dropdown-submenu dropend' : ''}">
                            <a className="dropdown-item {subCategory.subCategories|length > 0 ? 'dropdown-toggle' : ''}" href="{url("app_front_category_courses", {slug: subCategory.slug})}">{subCategory.name}</a>
                            {subCategory.subCategories|length > 0 && (

                                <ul className="dropdown-menu" data-bs-popper="none">
                                    {% for scat in subCategory.subCategories %}
                                        <li> <a className="dropdown-item" href="{url("app_front_category_courses", {slug: scat.slug})}">{scat.name}</a> </li>
                                    
))}
                                    <hr className="divider" />
                                    <li><a href="{url("app_front_category_courses", {slug: subCategory.slug})}" className="dropdown-item">All {subCategory.name} Courses</a></li>
                                </ul>
                            
)}
                        </li>
                    
))}
                    <hr className="divider" />
                    <li><a href="{url("app_front_category_courses", {slug: category.slug})}" className="dropdown-item">All {category.name} Courses</a></li>
                </ul>
            
)}
        </li>
    
))}
</ul>
    </>
  );
}
