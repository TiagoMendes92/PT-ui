import { usePreloadedQuery } from "react-relay";
import type { CategoriesQuery } from "../../../../__generated__/CategoriesQuery.graphql";
import { CATEGORIES_QUERY } from "./Categories.queries";
import { Fragment, useEffect } from "react";
import type { CategoriesTableBodyProps, Category } from "./types";
import EmptyCategory from "./EmptyCategory";
import {
  ActionButton,
  Actions,
  CatName,
  ImageCell,
  SubCatName,
  Table,
} from "./Categories.styles";
import HighlightText from "../../../shared/highlight_text/HighlightText";
import childIcon from "../../../../icons/child.svg";
import editIcon from "../../../../icons/edit.svg";
import deleteIcon from "../../../../icons/delete.svg";

const CategoriesTableBody = ({
  searchTerm,
  queryRef,
  categories,
  setCats,
  openCats,
  setOpenCats,
  setIsModalOpen,
  setIsDeleteModalOpen,
}: CategoriesTableBodyProps) => {
  const { categories: cats } = usePreloadedQuery<CategoriesQuery>(
    CATEGORIES_QUERY,
    queryRef
  );

  useEffect(() => {
    setCats(cats as Category[]);
    setOpenCats([]);
  }, [cats]);

  const toggleOpenCat = (cat: Category | null) => {
    if (!cat) return;
    if (openCats.some((c) => c.id === cat.id)) {
      setOpenCats((prev) => prev.filter((c) => c.id !== cat.id));
    } else {
      setOpenCats((prev) => [...prev, cat]);
    }
  };

  return (
    <tbody>
      {!categories.length ? (
        <EmptyCategory nrOfCols={3} />
      ) : (
        categories.map((category) => (
          <Fragment key={category.id}>
            <tr>
              <td>
                <CatName>
                  <button onClick={() => toggleOpenCat(category)}>
                    {openCats.some((c) => c.id === category.id) ? "-" : "+"}
                  </button>
                  <HighlightText text={category.name} searchTerm={searchTerm} />
                </CatName>
              </td>
              <td>
                <ImageCell>
                  <img src={category.photo?.url} />
                </ImageCell>
              </td>
              <td>
                <Actions>
                  <ActionButton onClick={() => setIsModalOpen({ category })}>
                    <img src={editIcon} alt="" />
                  </ActionButton>
                  <ActionButton onClick={() => setIsDeleteModalOpen(category)}>
                    <img src={deleteIcon} alt="" />
                  </ActionButton>
                </Actions>
              </td>
            </tr>
            {openCats.some((c) => c.id === category.id) && (
              <tr>
                <td colSpan={3} style={{ padding: 0 }}>
                  <Table>
                    <tbody>
                      {!category?.subcategories?.length ? (
                        <EmptyCategory />
                      ) : (
                        category.subcategories.map((sub) => (
                          <tr key={sub.id}>
                            <td style={{ width: "auto" }}>
                              <SubCatName>
                                <img src={childIcon} alt="" />
                                <HighlightText
                                  text={sub.name}
                                  searchTerm={searchTerm}
                                />
                              </SubCatName>
                            </td>
                            <td style={{ width: "150px" }}>
                              <ImageCell>
                                <img src={sub.photo?.url} />
                              </ImageCell>
                            </td>
                            <td style={{ width: "85px" }}>
                              <Actions>
                                <ActionButton
                                  onClick={() =>
                                    setIsModalOpen({
                                      category: {
                                        ...sub,
                                        subcategories: [],
                                      },
                                    })
                                  }
                                >
                                  <img src={editIcon} alt="" />
                                </ActionButton>
                                <ActionButton
                                  onClick={() =>
                                    setIsDeleteModalOpen({
                                      ...sub,
                                      subcategories: [],
                                    })
                                  }
                                >
                                  <img src={deleteIcon} alt="" />
                                </ActionButton>
                              </Actions>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </td>
              </tr>
            )}
          </Fragment>
        ))
      )}
    </tbody>
  );
};

export default CategoriesTableBody;
