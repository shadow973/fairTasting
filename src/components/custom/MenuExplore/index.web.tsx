import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const MenuExplore = () => {

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger style={{ backgroundColor: color.white, borderWidth: 0, textTransform: 'uppercase', fontFamily: brandFontFamily.h1, fontSize: brandFontSize.base, cursor: 'pointer' }}>Explore</DropdownMenu.Trigger>
            <DropdownMenu.Content style={{ backgroundColor: color.white, borderWidth: 0, textTransform: 'uppercase', fontFamily: brandFontFamily.h1, fontSize: brandFontSize.base, padding: 20 }}>
                <DropdownMenu.Item
                    style={{ textTransform: 'uppercase', fontFamily: brandFontFamily.h1, fontSize: brandFontSize.base, paddingTop: 5, paddingBottom: 5, cursor: 'pointer' }}
                    onSelect={() => console.log('cut')}>
                    Fairs
                </DropdownMenu.Item>
                <DropdownMenu.Separator style={{ height: 2, backgroundColor: color.lightGrey, marginTop: 5, marginBottom: 5 }} />
                <DropdownMenu.Item
                    style={{ textTransform: 'uppercase', fontFamily: brandFontFamily.h1, fontSize: brandFontSize.base, paddingTop: 5, paddingBottom: 5, cursor: 'pointer' }}
                    onSelect={() => console.log('cut')}>
                    Winebars
                </DropdownMenu.Item>
                <DropdownMenu.Separator style={{ height: 2, backgroundColor: color.lightGrey, marginTop: 5, marginBottom: 5 }} />
                <DropdownMenu.Item
                    style={{ textTransform: 'uppercase', fontFamily: brandFontFamily.h1, fontSize: brandFontSize.base, paddingTop: 5, paddingBottom: 5, cursor: 'pointer' }}
                    onSelect={() => console.log('cut')}>
                    Restaurants
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
}

export default MenuExplore