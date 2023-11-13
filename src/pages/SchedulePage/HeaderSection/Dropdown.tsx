import { UserData } from 'apis/types';
import FlexContainer from 'components/@commons/FlexContainer';
import Text from 'components/@commons/Text';
import { DropDown, DropUp } from 'components/@commons/icons';
import { useSelectMember } from 'pages/SchedulePage/hooks/useSelectMember';
import { DropDownCont, DropdownBtn } from 'pages/SchedulePage/styles';

const Dropdown = ({ members }: { members: UserData[] }): JSX.Element => {
  const { member, isOpen, dropdownOnClick, contentOnClick } = useSelectMember();

  return (
    <DropDownCont>
      <DropdownBtn onClick={dropdownOnClick}>
        <Text margin="0" size="sm">
          {member.name || '선택'}
        </Text>
        {isOpen ? <DropUp /> : <DropDown />}
      </DropdownBtn>
      {isOpen && (
        <FlexContainer $wFull $gap="10px" $padding="12px 0" as="ol" data-testid="멤버리스트">
          {members.slice(1).map((member: UserData, index) => (
            <FlexContainer
              as="li"
              $wFull
              $align="flex-start"
              key={member.name + index}
              onClick={() => contentOnClick(member)}
            >
              <Text margin="0" size="sm">
                {member.name}
              </Text>
            </FlexContainer>
          ))}
        </FlexContainer>
      )}
    </DropDownCont>
  );
};

export default Dropdown;
