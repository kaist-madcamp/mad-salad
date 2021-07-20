import styled from 'styled-components';
import { GetAllCategoriesData } from '../../../lib/api/types';

interface Props {
  pickedCategory: string;
  pickedType: 'expenditure' | 'income' | 'receive' | 'send';
  onClicked: (category: string) => void;
  allCategoryData: GetAllCategoriesData[];
}

export default function HistoryCategoryContainer({
  pickedCategory,
  pickedType,
  onClicked,
  allCategoryData,
}: Props) {
  if (!allCategoryData) return <p>카테고리가 존재하지 않습니다.</p>;

  return (
    <>
      {allCategoryData?.map((cat) => {
        if (cat.type.toLowerCase() !== pickedType.toLowerCase()) return;
        return (
          <CategoryIndicator
            key={cat.name}
            selected={pickedCategory === cat.name}
            onClick={() => onClicked(cat.name)}
          >
            {cat.name}
          </CategoryIndicator>
        );
      })}
    </>
  );
}

const CategoryIndicator = styled.div<{ selected?: boolean }>`
  height: 50px;
  display: flex;
  align-items: center;
  margin: 0 13px 13px 0;
  border-radius: 15px;
  padding: 13px 20px;
  background: ${(props) =>
    props.selected
      ? props.theme.selectedBgColor
      : props.theme.unselectedBgColor};
  color: ${(props) =>
    props.selected ? props.theme.selectedColor : props.theme.unselectedColor};
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  cursor: pointer;
`;
