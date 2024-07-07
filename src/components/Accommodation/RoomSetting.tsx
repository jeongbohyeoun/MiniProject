import { RoomSettingProps } from '../../types/types';

const RoomSetting: React.FC<RoomSettingProps> = ({ settingType, image }) => {
  return (
    <li className="room-setting-container">
      <img className="type-icon" src={image} alt={settingType} />
      <span className="type-text">{settingType}</span>
    </li>
  );
};

export default RoomSetting;
