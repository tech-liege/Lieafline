import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteOneSkill } from '../services/skillApi';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';

export default function EditSkill() {
  // const [isLoading, setIsLoading] = useState(false);
  const [deleting, setDeleting] = useState(true);
  const [res, setRes] = useState(null);
  const [skillTitle, setSkillTitle] = useState('');

  const { skillId } = useParams();
  const { token, SKILL_SERVER_URL } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    deleteOneSkill(SKILL_SERVER_URL, token, skillId)
      .then(data => {
        if (data.message === 'Skill deleted successfully') {
          setSkillTitle(data.skill.title);
          toast.success('Skill deleted successfully');
          setRes('Skill deleted successfully');
          navigate(`/skills?delSuccess=true&delSkillTitle=${skillTitle}`);
        } else if (data.message === 'Unauthorized to delete this skill') {
          toast.error('Unauthorized to delete this skill');
          setRes('Unauthorized to delete this skill');
        } else if (data.message === 'Skill not found') {
          toast.error('Skill not found');
          setRes('Skill not found');
        }
      })
      .catch(err => {
        toast.error(err.message);
        setRes(err.message);
        console.error(err);
      })
      .finally(() => setDeleting(false));
  }, [skillId, token, SKILL_SERVER_URL, skillTitle]);

  if (deleting) {
    return <div className='flex justify-center items-center h-screen text-gray-500'>Deleting skill...</div>;
  }

  if (res) {
    return <div className='flex justify-center items-center h-screen text-gray-500'>{res}</div>;
  }
  return <></>;
}
