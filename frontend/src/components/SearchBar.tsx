import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';
import { useContext } from 'react';
import { LanguageContext } from './LanguageProvider';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
    const { language } = useContext(LanguageContext);
    const [searchQuery, setSearchQuery] = useState('');

    const keywords = [
        ""
    ]
        ;

    const filteredKeywords = searchQuery
        ? keywords.filter(keyword => keyword.includes(searchQuery))
        : [];

    const handleSearchChange = (event: React.ChangeEvent<{}>, newValue: string | null) => {
        setSearchQuery(newValue || '');
        onSearch(newValue || '');
    };

    return (
        <div>
            <Autocomplete
                freeSolo
                options={filteredKeywords}
                inputValue={searchQuery}
                onInputChange={handleSearchChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        fullWidth
                        size="small"
                        placeholder={language === 'en' ? 'Search by faculties, building names and rooms' : '学部、建物、講義室で検索'}
                        variant="outlined"
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            )
                        }}
                    />
                )}
            />
        </div>
    );
}

export default SearchBar;
